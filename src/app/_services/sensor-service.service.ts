import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { firebaseConfig } from '../firebase/firebase';
import { FirebaseDatabaseService } from './firebase-database.service';
import { SensorDataDto } from '../_models/sensor-data-dto';
import { endAt, getDatabase, onValue, orderByChild, query, ref, startAt } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class SensorServiceService {


  constructor(private firebaseDatabase: FirebaseDatabaseService) { }

  onOxygenRealTimeValueAdded(onDataFetched: (data: SensorDataDto) => void) {
    this.firebaseDatabase.onElementAdded('oxygen', onDataFetched);
  }

  onPhRealTimeValueAdded(onDataFetched: (data: SensorDataDto) => void) {
    this.firebaseDatabase.onElementAdded('ph', onDataFetched);
  }

  onTurbidityRealTimeValueAdded(onDataFetched: (data: SensorDataDto) => void) {
    this.firebaseDatabase.onElementAdded('turbidity', onDataFetched);
  }

  onOrpRealTimeValueAdded(onDataFetched: (data: SensorDataDto) => void) {
    this.firebaseDatabase.onElementAdded('orp', onDataFetched);
  }

  onEcRealTimeValueAdded(onDataFetched: (data: SensorDataDto) => void) {
    this.firebaseDatabase.onElementAdded('ec', onDataFetched);
  }

  onTemperatureRealTimeValueAdded(onDataFetched: (data: SensorDataDto) => void) {
    this.firebaseDatabase.onElementAdded('temperature', onDataFetched);
  }

  getSensorDataOfPeriod(sensorName: string, from: number, to: number, onDataFetched: (data: SensorDataDto[]) => void) { 
    const database = getDatabase();
    const sensorRef = ref(database, sensorName);
    const sensorQuery = query(sensorRef, orderByChild('timestamp'), startAt(from), endAt(to));

    
    onValue(sensorQuery, snapshot => {
      let sensorData: SensorDataDto[] = [];
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val() as SensorDataDto;
        sensorData.push(data);
      });
      onDataFetched(sensorData);
    });
  }
}

