import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Customer } from '../customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';
import { EventDetailsComponent } from '../event-details/event-details.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  providers: [DialogService]
})
export class TripsComponent implements OnInit {
  public customer: Customer;
  public userId: string;
  public tripsList: any;
  public trip: any;
  public events: any;
  public showTripMap: boolean = false;
  public showTripEvents: boolean = false;
  dateFilterUIString = '';
  mapsData: any;
  latlngs: any;
  public tripEvents: any;
  public tripStartDate: Date = new Date();
  minDate: Date;
  maxDate: Date;
  graphJson: any;
  eventStartTime: any;

  //public base_url_trip: string = 'http://private-d9743-hum1.apiary-mock.com/HTIWebGateway/vv/rest/DrivingHistory/getDrivingHistoryEvents';
  //public base_url_trip: string = 'https://apix-uat.vtitel.net/HTIWebGateway/vv/rest/DrivingHistory/getDrivingHistoryEvents';
  //public base_url_trip: string = 'http://oai-drivinghistory.oh.stg.hum.aws.vz-connect.net:8080/HTIWebGateway/vv/rest/api/DrivingHistory/getDrivingHistoryEvents';
  //public base_url_trip: string = 'api/DrivingHistory/getDrivingHistory';
  //public base_url_Map: string = 'getGpsTrail/tripdetail';
  //public base_url_GeoCode: string = 'api/geocoding/AB001,37.621338,-122.379041|AB002,36.6412191,-82.570823?key=true&city=true&state=true';
  //public base_url_GeoCode: string = 'api/v2/everything?q=bitcoin&from=2020-03-24&sortBy=publishedAt&apiKey=ea7864bc06c247ea9a94dfd3db04968b';
  //public base_url_event: string = 'api/getEvents/';
  //public base_url_event: string = 'http://vzc-event-details-api.oh.stg.dat.aws.vz-connect.net:8080/getEvents/';

  constructor(private apiService: AppService, private router: Router, private route: ActivatedRoute,
    private dateToString: DateFormatPipe, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getAllTrips();
    this.generateMapData();
    this.getTripEvents();
    
  }

 
  private getCustomer() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.customer = this.apiService.getStorage() || JSON.parse((sessionStorage.getItem('info')));
  }

  getAllTrips() {
    // let postData = {
    //   "dataArea": {
    //     "endDate": this.tripStartDate,
    //     "overallSummaryNeededFlag": true,
    //     "startDate": this.tripStartDate,
    //     "preWeekEndDate": this.tripStartDate,
    //     "preWeekStartDate": this.tripStartDate,
    //     "summaryType": "day",
    //     "userId": this.customer.userid,
    //     "vehicleId": this.customer.imei_meid
    //   },
    //   "header": {
    //     "applicationName": "mapp",
    //     "organization": "hum",
    //     "region": "US",
    //     "sourceName": "android",
    //     "timestamp": "2019-03-26T14:05:07.951-04:00",
    //     "transactionId": "1038846624877909282678640744792019040101"
    //   }
    // }

    // this.apiService.post(this.base_url_trip, postData).subscribe(res => {
    //   console.log(res);
    //   let data = res as any;
    //   this.tripsList = data.data;
    // });

    this.apiService.getJson('assets/tripsNew.json').subscribe(res => {
      this.tripsList = res;
    });
  }

  generateMapData() {
    // let postData = {
    //   "imei":this.customer.imei,
    //   "year": new Date().getFullYear(),
    //   "month": new Date().getMonth()+1,
    //   "day": new Date().getDate(),
    //   "transactionid": "Testing"
    //   }

    // this.apiService.post(this.base_url_Map, postData).subscribe(res => {
    //   let data = res as any;
    //   this.mapsData = data.data;
    //   console.log(this.mapsData);
    // });

    // this.apiService.getJson(this.base_url_Map).
    // subscribe(data => {
    //   console.log(data);
    // })

    this.apiService.getJson('assets/mapNew.json').subscribe(res => {
      this.mapsData = res;
    });
  }

  getTripEvents() {
    this.apiService.getJson('assets/eventsgraphNew.json').subscribe(res => {
      this.tripEvents = res;
    });
  }

  public showMap(selected: any) {
    this.mapsData.imei.trips.forEach(element => {
      var stTime = new Date(selected.startTime)
      this.eventStartTime = 1588102437; //stTime.getTime()/1000.0;
     if (this.eventStartTime == element.tripStart) {
        this.trip = element;
      }
    });

    this.showTripMap = false;
    this.showTripEvents = false;

    setTimeout(() => {
      this.showTripMap = true;
      this.showTripEvents = true;
    }, 100);
  }

  // public navigateToEventDetails() {
  //   this.router.navigate(['/event-detail']);
  // }

  public nextDate(){
    console.log(this.tripStartDate);
    if (this.tripStartDate.getDate() == new Date().getDate()) {
      alert("no next day records");
      return;
    }
    let current = new Date(this.tripStartDate);
    current.setDate(current.getDate()+1);
    this.tripStartDate = current;
    this.getAllTrips();
  }
  public previousDate(){
    let minDate = new Date(new Date().setDate(new Date().getDate() - 15));
    let current = new Date(this.tripStartDate);
    if (current < minDate) {
      alert('no records');
      return;
    }
    current.setDate(current.getDate()-1);
    this.tripStartDate = current;
    this.getAllTrips();
  }

  changeDate(moveForward) {
    let cd = new Date();
    cd.setHours(0, 0, 0, 0);
    let dayMS = 24 * 60 * 60 * 1000;

}
show() {
  // const ref = this.dialogService.open(EventDetailsComponent, {
      
  //     width: '40%',
  //     showHeader: true,
  //     closable: true,
  // });
}
}
