import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { ZoomComponent } from '../zoom/zoom.component';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [DialogService]
})
export class EventDetailsComponent implements OnInit {

  first: string = 'first';
  second: string = 'second';
  third: string = 'third';
  clickedEventInfo: any;
  clickedEventIndex: number = 0;
  tripEvents;
  constructor( public eventDialogService: DialogService, public config: DynamicDialogConfig, public ref: DynamicDialogRef) {}
  ngOnInit(): void {
    this.clickedEventInfo = this.config.data.eventInfo;
    this.tripEvents = this.config.data.tripEvents;
  }

  mapClick(type:string) {
    const ref = this.eventDialogService.open(ZoomComponent, {
      width: '90%',
      showHeader: true,
      closable: true,
      data: {
        'type': type,
        'tripEvents': this.config.data.tripEvents
      }
  });
  }

  eventIndex(event){
    console.log(event);
    this.clickedEventIndex = parseInt(event);
  }

  nextEvent() {
    console.log(this.clickedEventIndex++);
  }

  previousEvent() {
    console.log(this.clickedEventIndex--);
  }
}
