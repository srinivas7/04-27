import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  first: string = 'first';
  second: string = 'second';
  type:string;

  constructor( public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    if(this.config.data) {
      this.type = this.config.data.type;
    }
  }

}
