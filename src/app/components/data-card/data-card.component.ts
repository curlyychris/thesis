import { Component, Input, OnChanges } from '@angular/core';
import { SensorDataDto } from 'src/app/_models/sensor-data-dto';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnChanges {

  @Input() sensorName: string = "";
  @Input() imagePath: string = "";
  @Input() sensorData: SensorDataDto | undefined;

  unitAndValue: string = "";

  ngOnChanges(): void {
    if (this.sensorData) {
      this.unitAndValue = this.sensorData.value?.toString() + " " + this.sensorData.unit;
    }
  }
}