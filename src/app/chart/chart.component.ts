import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private http: HttpClient,  public config: DynamicDialogConfig) { }
  @Input() type;
  @Input() clickedEventInfo;
  @Output() eventIndex = new EventEmitter();
  @Input('clickedEventIndex')
  set updateEventDetails(value) {
    if(this.eventDetails && value) {
      this.clickedEvent = this.eventDetails[value];
      this.updateMaps();
    }
    
  }

  eventDetails;
  clickedEvent;
  clickedEventIndex = 0;
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
    
    this.buildChartData();
  }

  private buildChartData() {
    console.log('this.config.data.tripEvents', this.config.data.tripEvents);
    this.graphJson = this.config.data.tripEvents;
    this.generateAccelData(this.graphJson);
    // const promise = this.http.get("assets/graphs.json").toPromise();
    // promise.then((res) => {
    //   this.graphJson = res;
    //   this.generateAccelData(res);
    // }).catch((error) => {
    //   console.log("Promise rejected with " + JSON.stringify(error));
    // });
  }

  updateMaps() {
    this.lineChartLabels = [];
    this.lineChartData = [
      { data: [], label: 'RAW', yAxisID: 'yAxis1' },
      { data: [], label: 'SMOOTH', yAxisID: 'yAxis1' }
    ];
    let accelLength = this.clickedEvent.accel.length + 1;
    for (let index = 0; index < accelLength; index++) {
      this.lineChartLabels.push(String(index));
    }
    this.clickedEvent.accel.forEach(element => {
      if (this.type === 'first') {
        this.lineChartData[0].data.push(element[1]);
        this.lineChartData[1].data.push(element[4]);
      } else if (this.type === 'second') {
        this.lineChartData[0].data.push(element[2]);
        this.lineChartData[1].data.push(element[5]);
      }
    });
    // this.clickedEvent.speed.forEach(element => {
    //   if (this.type === 'third') {
    //     this.lineChartData[0].data.push(element[0]);
    //   }
    // });
  }

  generateAccelData(data) {
    console.log('clicked event info is..', this.clickedEventInfo);
    this.eventDetails = data.eventDetails;
    data.eventDetails.forEach((element, index) => {
      if(element.gpsLatitude === this.clickedEventInfo.latlng.lat && element.gpsLongitude === this.clickedEventInfo.latlng.lng) {
        this.clickedEvent = element;
        this.clickedEventIndex = index;
        this.eventIndex.emit(this.clickedEventIndex+'');
      }
    });
    this.updateMaps();
    
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
  });
  }
}
