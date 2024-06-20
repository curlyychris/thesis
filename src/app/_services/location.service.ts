import { Injectable } from '@angular/core';
import { FirebaseDatabaseService } from './firebase-database.service';
import { onChildAdded, onChildChanged, ref } from 'firebase/database';
import { Coordinates } from '../_models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private fireBaseDatabase:FirebaseDatabaseService) { }

  onLocationAdded(onLocationAdded:(coords:Coordinates)=>void)
  {
    const fileRef=ref(this.fireBaseDatabase.database(),'location');

    onChildAdded(fileRef,(snapshot)=>{
      const data = snapshot.val();
      const location:Coordinates=data as Coordinates;

      onLocationAdded(location);
    });
  }

  
  onLocationChanged(onLocationChanged:(coords:Coordinates)=>void)
  {
    const fileRef=ref(this.fireBaseDatabase.database(),'location');

    onChildChanged(fileRef,(snapshot)=>{
      const data = snapshot.val();
      const location:Coordinates=data as Coordinates;
      onLocationChanged(location);

    });
  }


}
