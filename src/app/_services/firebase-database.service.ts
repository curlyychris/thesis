import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/firebase';
import { Database, getDatabase, limitToLast, onChildAdded,onChildChanged, orderByKey, query, ref } from 'firebase/database';
import { Data } from '@angular/router';
import { last } from 'rxjs';
import { SensorDataDto } from '../_models/sensor-data-dto';
import { getFirestore } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {


  private db: Database;
  private firestoreDb: Firestore;
  
  

  constructor() {
    
    const app = initializeApp(firebaseConfig);

    this.db = getDatabase(app);

    this.firestoreDb= getFirestore(app);

   }



   onElementAdded(fileName: string, onDataFetched:(data:SensorDataDto)=>void){
    const fileRef = ref(this.db, fileName);

    const lastDataQuery = query(fileRef, limitToLast(1));

    onChildAdded(lastDataQuery, (snapshot) => {
      const data = snapshot.val();
      
      if (data !== null) {
        onDataFetched(data as SensorDataDto);
      } else {
        console.log("No data available");
      }
    });
   }

   

   database()
   {
    return this.db;
   }

   getFirestoreDb()
   {
    return this.firestoreDb;
   }


}
