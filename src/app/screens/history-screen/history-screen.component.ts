import { ChangeDetectorRef, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { from } from 'rxjs';
import { sensorDataSamples } from 'src/app/_data/sensor-mock-data';
import { PlotTypes } from 'src/app/_enums/plot_types_enum';
import { SensorDataDto } from 'src/app/_models/sensor-data-dto';
import { SensorTimestampedData } from 'src/app/_models/timestamp-data';
import { SensorServiceService } from 'src/app/_services/sensor-service.service';
import { DateTimeUtility } from 'src/app/_utility/date-time-utility';
import { StringUtility } from 'src/app/_utility/string-utility';
import { GraphProperties } from 'src/app/components/graph/graph.component';

@Component({
  selector: 'app-history-screen',
  templateUrl: './history-screen.component.html',
  styleUrls: ['./history-screen.component.css']
})


export class HistoryScreenComponent implements OnInit{

  selectedDate: Date = new Date();
  
  

  oxygenGraphProperties:GraphProperties<SensorTimestampedData>;
  turbidityGraphProperties:GraphProperties<SensorTimestampedData>;
  orpGraphProperties:GraphProperties<SensorTimestampedData>;
  temperatureGraphProperties:GraphProperties<SensorTimestampedData>;
  electricalConductivityGraphProperties:GraphProperties<SensorTimestampedData>;
  phGraphProperties:GraphProperties<SensorTimestampedData>;

  plotTypes:typeof PlotTypes = PlotTypes;


  constructor(private sensorServiceService: SensorServiceService,private cdr:ChangeDetectorRef) {
    this.oxygenGraphProperties =this.initGraphProperty("");
    this.turbidityGraphProperties =this.initGraphProperty("");
    this.orpGraphProperties =this.initGraphProperty("");
    this.temperatureGraphProperties =this.initGraphProperty("");
    this.electricalConductivityGraphProperties =this.initGraphProperty("");
    this.phGraphProperties =this.initGraphProperty(""); 
  }


  ngOnInit(): void {

    this.loadSensorData(DateTimeUtility.getStartOfDayMilli(this.selectedDate), DateTimeUtility.getEndOfDayMilli(this.selectedDate));

  }


  initGraphProperty(title:string):GraphProperties<SensorTimestampedData>
  {
    return {
      data:[],
      titleText:title,
      xkey:"timestamp",
      ykey:"sensorValue",
      type:PlotTypes.line,
      connectMissingLines:true
    }
  }


  onOxygenDataFetched(data: SensorDataDto[])
  {
    this.oxygenGraphProperties = {
      ...this.oxygenGraphProperties,
      data: this.getSensorDataMedianPerInterval(60, data)
    };
    this.cdr.detectChanges();
    // console.log(this.oxygenGraphProperties.data);
  }
  onTurbidityDataFetched(data: SensorDataDto[])
  {
    this.turbidityGraphProperties = {
      ...this.turbidityGraphProperties,
      data: this.getSensorDataMedianPerInterval(60, data)
    };
    this.cdr.detectChanges();
  }
  onOrpDataFetched(data: SensorDataDto[])
  {
    this.orpGraphProperties = {
      ...this.orpGraphProperties,
      data: this.getSensorDataMedianPerInterval(60, data)
    };
    this.cdr.detectChanges();
  }
  onTemperatureDataFetched(data: SensorDataDto[])
  {
    this.temperatureGraphProperties = {
      ...this.temperatureGraphProperties,
      data: this.getSensorDataMedianPerInterval(60, data)
    };
    this.cdr.detectChanges();
  }
  onElectricalConductivityDataFetched(data: SensorDataDto[])
  {
    this.electricalConductivityGraphProperties = {
      ...this.electricalConductivityGraphProperties,
      data: this.getSensorDataMedianPerInterval(60, data)
    };
    this.cdr.detectChanges();
  }
  onPhDataFetched(data: SensorDataDto[])
  {
    this.phGraphProperties = {
      ...this.phGraphProperties,
      data: this.getSensorDataMedianPerInterval(60, data)
    };
    this.cdr.detectChanges();
  }
  

  
  loadSensorData(from: number, to: number) {

    this.sensorServiceService.getSensorDataOfPeriod("oxygen", from, to, this.onOxygenDataFetched.bind(this));
    this.sensorServiceService.getSensorDataOfPeriod("ec", from, to, this.onElectricalConductivityDataFetched.bind(this));
    this.sensorServiceService.getSensorDataOfPeriod("turbidity", from, to, this.onTurbidityDataFetched.bind(this));
    this.sensorServiceService.getSensorDataOfPeriod("ph", from, to, this.onPhDataFetched.bind(this));
    this.sensorServiceService.getSensorDataOfPeriod("temperature", from, to, this.onTemperatureDataFetched.bind(this));
    this.sensorServiceService.getSensorDataOfPeriod("orp", from, to, this.onOrpDataFetched.bind(this));
  }

  onDateChange(event: any) {

    this.selectedDate = event.target.value;
    let startOfDay = new Date(this.selectedDate);
    let endOfDay = new Date(this.selectedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const startOfDayMillis = Date.parse(startOfDay.toISOString());
    const endOfDayMillis = Date.parse(endOfDay.toISOString());
    this.loadSensorData(startOfDayMillis, endOfDayMillis);
    console.log(startOfDayMillis + " " + endOfDayMillis);

  }

  getSensorDataMedianPerInterval(minutes: number, sensorData: SensorDataDto[]): SensorTimestampedData[] {

    if (sensorData.length === 0) {
      return [];
    }

    const sensorDataSorted: SensorDataDto[] = sensorData.sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const startOfDay: Date = new Date(sensorData[0].timestamp);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const intervalTimeLimit: Date = new Date(startOfDay);

    var hasEndOfDayReached: boolean = false;

    var sensorDataIndex: number = 0;

    const sensorDataMedians: SensorTimestampedData[] = [];

    while (hasEndOfDayReached === false) {
      intervalTimeLimit.setUTCMinutes(intervalTimeLimit.getUTCMinutes() + minutes);
      //console.log(intervalTimeLimit.getMinutes()+" "+intervalTimeLimit.getHours());
      if (intervalTimeLimit >= endOfDay) {
        hasEndOfDayReached = true;
        intervalTimeLimit.setUTCHours(23, 59, 59, 999);
      }

      const sensorDataMedian: SensorTimestampedData = {
        timestamp: DateTimeUtility.getFormattedHourAndMinute(intervalTimeLimit),
        sensorValue: null
      }

      var sensorDataSum = 0;
      var sensorDataCount = 0;
      var wasTimeLimitExceeded: boolean = false;

      while (sensorDataIndex < sensorData.length) {
        const sensorDataDate: Date = new Date(sensorDataSorted[sensorDataIndex].timestamp);
        // console.log(sensorDataDate.getTime()+ "<="+ intervalTimeLimit.getTime());
        if (sensorDataDate.getTime() <= intervalTimeLimit.getTime()) { 
          //console.log(sensorDataDate.getHours()+" "+sensorDataDate.getMinutes()+" "+intervalTimeLimit.getHours()+" "+intervalTimeLimit.getMinutes());
          sensorDataSum += sensorDataSorted[sensorDataIndex].value;
          sensorDataIndex++;
          sensorDataCount++;          
        }
        else {
          wasTimeLimitExceeded = true;
        }

        if (wasTimeLimitExceeded === true || sensorDataIndex >= sensorData.length-1) {
          sensorDataMedian.sensorValue = sensorDataSum / sensorDataCount;
          break;
        }
      }
      sensorDataMedians.push(sensorDataMedian);
    }

    return sensorDataMedians;

  }

}
