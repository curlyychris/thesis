import { Component, Input, OnInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { SensorDataDto } from 'src/app/_models/sensor-data-dto';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {


  @Input() sensorData: SensorDataDto[] = [];

  @Input() titleText: string="";

  @Input() xkey: string="";

  @Input() ykey: string="";

  @Input() type: string="";

  chartOptions: AgChartOptions | undefined;

  ngOnInit(): void {
    this.chartOptions = {

      title:{
        text:this.titleText,fontWeight: 'bold',fontSize: 20
      },
      data: this.sensorData,
      
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }]
    };
  }


 
 
}
