import { Component, Input, OnInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { PlotTypes } from 'src/app/_enums/plot_types_enum';
import { SensorDataDto } from 'src/app/_models/sensor-data-dto';

export interface GraphProperties<T>
{
  data: T[];
  titleText: string;
  xkey: string;
  ykey: string;
  type: PlotTypes;
  connectMissingLines: boolean;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})



export class GraphComponent <T> {

  @Input() set graphProperties(graphProperties:GraphProperties<T>)
  {
    this.chartOptions = {

      title:{
        text:graphProperties.titleText,fontWeight: 'bold',fontSize: 20
      },
      data: graphProperties.data,
      
      series: [{ type:graphProperties.type, xKey:graphProperties.xkey , yKey:graphProperties.ykey,connectMissingData:graphProperties.connectMissingLines}]
    };
  }

  @Input() chartDescription: string = "";

  @Input() chartTitle: string = "";




  chartOptions: AgChartOptions | undefined;




}
