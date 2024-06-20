import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isRealTimeScreenOn: boolean = true;
  titleText: string = "Real Time Data";


  onRealTimeClick() {

    this.titleText = "Real Time Data";
    this.isRealTimeScreenOn = true;
  }

  onHistoricalClick() {

    this.titleText = "Historical Data";
    this.isRealTimeScreenOn = false;
  }
}

