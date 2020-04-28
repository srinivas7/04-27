import { Component, OnInit, Input } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private http: HttpClient) { }
  @Input() type;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'RAW', yAxisID: 'yAxis1' },
    { data: [], label: 'SMOOTH', yAxisID: 'yAxis1' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'yAxis1',
          position: 'left'
        }
      ]
    },

    elements:
    {
      point:
      {
        radius: 0,
      },
      line:
      {
        borderWidth: 1
      },
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public graphJson: any;
  public lineChartColors: Color[] = [
    {
      borderColor: 'pink',
      backgroundColor: 'white',
    },
  ];

  ngOnInit() {
    debugger;
    this.buildChartData();
  }

  private buildChartData() {
    const promise = this.http.get("assets/graphs.json").toPromise();
    promise.then((res) => {
      this.graphJson = res;
      this.generateAccelData(res);
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  generateAccelData(data) {

    let accelLength = data.eventDetails[0].accel.length + 1;
    for (let index = 0; index < accelLength; index++) {
      this.lineChartLabels.push(String(index));
    }
    data.eventDetails[0].accel.forEach(element => {
      if (this.type === 'first') {
        this.lineChartData[0].data.push(element[1]);
        this.lineChartData[1].data.push(element[4]);
      } else if (this.type === 'second') {
        this.lineChartData[0].data.push(element[2]);
        this.lineChartData[1].data.push(element[5]);
      }
    });
    data.eventDetails[0].speed.forEach(element => {
      if (this.type === 'third') {
        this.lineChartData[0].data.push(element[0]);
      }
    });
  }

  generateAccelDataNew(data) {
    data.eventDetails.forEach(element => {
      let accelLength = element.accel.length + 1;
    for (let index = 0; index < accelLength; index++) {
      this.lineChartLabels.push(String(index));
    }
    element.accel.forEach(element1 => {
      if (this.type === 'first') {
        this.lineChartData[0].data.push(element1[1]);
        this.lineChartData[1].data.push(element1[4]);
      } else if (this.type === 'second') {
        this.lineChartData[0].data.push(element1[2]);
        this.lineChartData[1].data.push(element1[5]);
      }
    });
    if (data.eventDetails.speed) {
      if (this.type === 'third') {
        element.speed.forEach(element2 => {
          this.lineChartData[0].data.push(element2[0]);
        })
      }
    }
  })
  }
}
