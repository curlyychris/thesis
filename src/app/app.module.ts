import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { RealTimeScreenComponent } from './screens/real-time-screen/real-time-screen.component';
import { DataCardComponent } from './components/data-card/data-card.component';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.development';
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { CurrentLocationMapComponent } from './components/current-location-map/current-location-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GraphComponent } from './components/graph/graph.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { HomeComponent } from './screens/home/home.component';
import { HistoryScreenComponent } from './screens/history-screen/history-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    RealTimeScreenComponent,
    DataCardComponent,
    CurrentLocationMapComponent,
    GraphComponent,
    HomeComponent,
    HistoryScreenComponent,
  ],
  imports: [
    AgChartsAngularModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GoogleMapsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"water-quality-app-1c0ba","appId":"1:16551431695:web:33a4a23bcd89a99796dd7a","databaseURL":"https://water-quality-app-1c0ba-default-rtdb.firebaseio.com","storageBucket":"water-quality-app-1c0ba.appspot.com","apiKey":"AIzaSyCig-RDFemQkBbvUuNMSYqy-Eo46xP_RSo","authDomain":"water-quality-app-1c0ba.firebaseapp.com","messagingSenderId":"16551431695","measurementId":"G-CJ0EDYG3TG"})),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),

    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
