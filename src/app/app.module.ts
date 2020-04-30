import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { CustomerComponent } from './customer/customer.component';
import { TripsComponent } from './trips/trips.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AppService } from './services/app.service';
import { DateFormatPipe } from './date-format.pipe';
import {AddSpacePipe} from './trips/remove.space.pipe';
import { HourPipe } from './trips/hour.pipe';
import {CalendarModule} from 'primeng/calendar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {CardModule} from 'primeng/card';
import { ZoomComponent } from './zoom/zoom.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CustomerComponent,
    TripsComponent,
    AddSpacePipe,
    HourPipe,
    EventDetailsComponent,
    ChartComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    CalendarModule,
    OverlayPanelModule,
    CommonModule,
    DynamicDialogModule,
    PaginatorModule,
    CardModule,
    TableModule
  ],
  providers: [AppService,DateFormatPipe],
  bootstrap: [AppComponent],
  entryComponents: [EventDetailsComponent, ChartComponent, ZoomComponent]
})
export class AppModule { }
