import { Component } from '@angular/core';
import { sensorDataSamples } from 'src/app/_data/sensor-mock-data';
import { SensorDataDto } from 'src/app/_models/sensor-data-dto';
import { SensorTimestampedData } from 'src/app/_models/timestamp-data';
import { SensorServiceService } from 'src/app/_services/sensor-service.service';
import { StringUtility } from 'src/app/_utility/string-utility';

@Component({
  selector: 'app-history-screen',
  templateUrl: './history-screen.component.html',
  styleUrls: ['./history-screen.component.css']
})
export class HistoryScreenComponent {

  oxygenSensorData: SensorDataDto[] = [];


  constructor(private sensorServiceService: SensorServiceService) {


  }

  loadSensorData(from: number, to: number,) {
    // this.sensorServiceService.getSensorDataOfPeriod("oxygen", from, to).then(data => {
    //   console.log(data);
    //   this.oxygenSensorData = data;
    //});
    this.oxygenSensorData = sensorDataSamples;
     console.log(this.getSensorDataMedianPerInterval(60, sensorDataSamples));
  }

  onDateChange(event: any) {

    const selectedDate = event.target.value;
    let startOfDay = new Date(selectedDate);
    let endOfDay = new Date(selectedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const startOfDayMillis = Date.parse(startOfDay.toISOString());
    const endOfDayMillis = Date.parse(endOfDay.toISOString());
    console.log(startOfDayMillis);
    console.log(endOfDayMillis);

    console.log(new Date(startOfDayMillis));
    console.log(new Date(endOfDayMillis));
    this.loadSensorData(startOfDayMillis, endOfDayMillis);
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
        timestamp: {
          hours: intervalTimeLimit.getUTCHours(),
          minutes: intervalTimeLimit.getUTCMinutes(),
        },
        sensorValue: null
      }

      var sensorDataSum = 0;
      var sensorDataCount = 0;
      var wasTimeLimitExceeded: boolean = false;

      while (sensorDataIndex < sensorData.length) {
        const sensorDataDate: Date = new Date(sensorDataSorted[sensorDataIndex].timestamp);
        if (sensorDataDate.getTime() <= intervalTimeLimit.getTime()) { 
          //console.log(sensorDataDate.getHours()+" "+sensorDataDate.getMinutes()+" "+intervalTimeLimit.getHours()+" "+intervalTimeLimit.getMinutes());
          sensorDataSum += sensorDataSorted[sensorDataIndex].value;
          sensorDataIndex++;
          sensorDataCount++;
        }
        else {
          wasTimeLimitExceeded = true;
        }

        if (wasTimeLimitExceeded === true || sensorDataIndex === sensorData.length - 1) {
          sensorDataMedian.sensorValue = sensorDataSum / sensorDataCount;
          break;
        }
      }
      sensorDataMedians.push(sensorDataMedian);
    }

    return sensorDataMedians;

  }

}
