import { Component } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Coordinates } from 'src/app/_models/location';
import { SensorDataDto } from 'src/app/_models/sensor-data-dto';
import { FirebaseDatabaseService } from 'src/app/_services/firebase-database.service';
import { LocationService } from 'src/app/_services/location.service';
import { SensorServiceService } from 'src/app/_services/sensor-service.service';

@Component({
  selector: 'app-real-time-screen',
  templateUrl: './real-time-screen.component.html',
  styleUrls: ['./real-time-screen.component.css']
})
export class RealTimeScreenComponent {

  oxygenRealTimeData: SensorDataDto | undefined;
  ecRealTimeData: SensorDataDto | undefined;
  temperatureRealTimeData: SensorDataDto | undefined;
  turbidityRealTimeData: SensorDataDto | undefined;
  orpRealTimeData: SensorDataDto | undefined;
  phRealTimeData: SensorDataDto | undefined;

  private setOxygenRealTimeValue(value: SensorDataDto) {
    this.oxygenRealTimeData= value;
    //console.log(value);
  }
  private setOrpRealTimeValue(value: SensorDataDto) {
    this.orpRealTimeData= value;
  }
  private setEcRealTimeValue(value: SensorDataDto) {
    this.ecRealTimeData= value;
  }
  private setTemperatureRealTimeValue(value: SensorDataDto) {
    this.temperatureRealTimeData= value;
  }
  private setPhRealTimeValue(value: SensorDataDto) {
    this.phRealTimeData= value;
  }
  private setTurbidityRealTimeValue(value: SensorDataDto) {
    this.turbidityRealTimeData= value;
  }



  constructor(private sensorService: SensorServiceService,private locationService:LocationService) {
    this.setOxygenRealTimeValue = this.setOxygenRealTimeValue.bind(this);
    this.sensorService.onOxygenRealTimeValueAdded(this.setOxygenRealTimeValue);

    this.setTurbidityRealTimeValue = this.setTurbidityRealTimeValue.bind(this);
    this.sensorService.onTurbidityRealTimeValueAdded(this.setTurbidityRealTimeValue);

    this.setEcRealTimeValue = this.setEcRealTimeValue.bind(this);
    this.sensorService.onEcRealTimeValueAdded(this.setEcRealTimeValue);

    this.setOrpRealTimeValue = this.setOrpRealTimeValue.bind(this);
    this.sensorService.onOrpRealTimeValueAdded(this.setOrpRealTimeValue);

    this.setPhRealTimeValue = this.setPhRealTimeValue.bind(this);
    this.sensorService.onPhRealTimeValueAdded(this.setPhRealTimeValue);

    this.setTemperatureRealTimeValue = this.setTemperatureRealTimeValue.bind(this);
    this.sensorService.onTemperatureRealTimeValueAdded(this.setTemperatureRealTimeValue);
    
  }

}
