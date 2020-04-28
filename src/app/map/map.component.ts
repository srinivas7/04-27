import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { BOUNDARY_ALERT_CONFIG } from 'src/environments/environment';
import { Customer } from '../customer/customer';
import { EventDetailsComponent } from '../event-details/event-details.component';
import {DialogService} from 'primeng/dynamicdialog';

declare var ol: any;
declare var L: any;
declare var MQ: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  public customer: Customer;
  markersLayer: any;
  map: any;

  @Output()
  viewTripdetail = new EventEmitter();
  ribbonConfig: any;
  locationData: any;
  config: any;
  mapId: any;
  latlngs: any;
  public eventLatLngs: any;
  startLocation: any;
  endLocation: any;
  routeLayer: any;
  leafletExpandIcon: any;
  startLocationIcon: any;
  endLocationIcon: any;
  eventLocationIcon: any;
  endIcon: boolean;
  tripMapIcon: any;
  pointsLayer: any;
  mapKey: any;
  mapConf: any;
  events: any;

  @Input() trip: any;
  @Input() tripEvents: any;

  public mapsData: any;
  public eventData: any;
  public routePoints: any[] = [];
  public eventPoints: any[] = [];

  constructor(private router: Router, private apiService: AppService,
    public dialogService: DialogService) { }

  ngOnInit() {
    this.pointsLayer = new L.LayerGroup();
    this.getTripMapData();
    //this.getTripEventData();
  }

  private getTripMapData() {
    this.latlngs = this.getRoutePointList();
    this.eventLatLngs = this.getEventPointList();
    this.renderPolyline();
  }

  // private getTripEventData() {
  //   this.tripEvents.eventDetails.forEach(event => {
  //     if (this.trip.startTime == event.tripStartGmt) {
  //       this.events = event;
  //     }
  //   });
  // }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap = function () {
    if (this.mapConf && this.mapConf.DEFAULT_CONFIG && this.mapConf.DEFAULT_CONFIG.mapKey) {
      this.mapKey = this.mapConf.DEFAULT_CONFIG.mapKey.mapkey
    } else {
      this.mapKey = BOUNDARY_ALERT_CONFIG.mapkey
    };
    L.mapquest.key = this.mapKey;
    let baseLayer = L.mapquest.tileLayer('map');
    this.latlang = [33.9146498, -84.34197];
    this.routeLayer = new L.FeatureGroup();
    this.map = L.mapquest.map('map', {
      center: this.latlang,
      layers: baseLayer,
      zoomControl: false,
      zoom: 16,
      maxZoom: 20,
      draggable: true,
    });
    this.btncontrolls(this);
    this.markersLayer = new L.LayerGroup();
    this.map.addLayer(this.markersLayer);
    this.map.scrollWheelZoom.disable();
  };

  getMarker(data, key) {
    return new L.marker([data.lat, data.lng], {
      icon: this.tripMapIcon,
    })
      .bindPopup('Test')
      .openPopup();
  }

  renderMarker() {
    let address = [],
      markers = new L.LayerGroup();

    this.initializeIcons();
    let marker;

    address.push(this.latlngs[0]);
    marker = new L.marker([this.latlngs[0].lat, this.latlngs[0].lng], {
      icon: this.startLocationIcon,
    })
      .bindPopup('<strong>' + this.latlngs[0].lat + '</strong>')
      .openPopup();
    markers.addLayer(marker);

    address.push(this.latlngs[this.latlngs.length - 1]);
    marker = new L.marker([this.latlngs[this.latlngs.length - 1].lat, this.latlngs[this.latlngs.length - 1].lng], {
      icon: this.endLocationIcon,
    })
      .bindPopup('<strong>' + [this.latlngs[this.latlngs.length - 1].lat] + '</strong>')
      .openPopup();
    markers.addLayer(marker);

    let eventPointsCount: number = this.eventLatLngs.length;
    for(let i=0; i<eventPointsCount; i++) {
      address.push(this.eventLatLngs[i]);
      marker = new L.marker([this.eventLatLngs[i].lat, this.eventLatLngs[i].lng], {
        icon: this.eventLocationIcon,
      })
        .openPopup();
        marker.addEventListener("click", (event: Event) => {
          const ref = this.dialogService.open(EventDetailsComponent, {
            width: '90%',
            showHeader: true,
            closable: true
        });
        });
      markers.addLayer(marker);
    }

    setTimeout(() => {
      if (this.map) {
        this.map.removeLayer(this.pointsLayer);
        this.pointsLayer.clearLayers();
        markers.addTo(this.pointsLayer);
        this.pointsLayer.addTo(this.map);
      }
    }, 0);
  }

  renderPolyline() {
    let allpoints = [];
    let currentpoints = [];
    let routeLayer = new L.FeatureGroup();
    this.renderMarker();

    for (let i = 1; i < this.latlngs.length - 1; i++) {
      allpoints.push(this.latlngs[0]);
      currentpoints = [...currentpoints, ...[this.latlngs[i]]];
      let ribbonColor = '#08BFC1';
      let polyline = new L.Polyline(currentpoints, {
        color: ribbonColor,
        weight: 4,
        opacity: 1,
        smoothFactor: 1,
      });
      polyline.addTo(routeLayer);
    }

    setTimeout(() => {
      this.map.removeLayer(this.routeLayer);
      routeLayer.addTo(this.routeLayer);
      this.routeLayer.addTo(this.map);
      if (currentpoints.length > 1) {
        this.map.flyToBounds(this.routeLayer.getBounds(), { maxZoom: 20, zoom: 16 });
      }
    }, 0);
  }

  renderExpandIcon(self) {
    let customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },
      onAdd: function () {
        self.leafletExpandIcon = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        self.leafletExpandIcon.id = 'leaflet-control-expand';
        self.leafletExpandIcon.style.backgroundColor = 'white';
        self.leafletExpandIcon.style.width = '35px';
        self.leafletExpandIcon.style.height = '35px';
        self.leafletExpandIcon.style.borderRadius = '16px';
        self.leafletExpandIcon.style.boxShadow = 'none';
        self.leafletExpandIcon.style.display = 'none';
        self.leafletExpandIcon.innerHTML = `<img class="cursor" src="./assets/driving-history/map-expand.svg" style="width: 40px; height:40px;cursor:pointer">`;

        self.leafletExpandIcon.onclick = function () {
          self.expand('test', self);
        };
        return self.leafletExpandIcon;
      },
    });

    if (this.map) {
      this.map.addControl(new customControl());
    }
  }
  btncontrolls(self) {
    let vehiclePosition = [40.7128, -74.006];
    // Adding layer group
    this.markersLayer = new L.LayerGroup();
    this.map.addLayer(this.markersLayer);
    this.renderExpandIcon(self);
    // Zoom control button
    let zoomControl = L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(this.map);
  }

  initializeIcons() {
    this.tripMapIcon = L.icon({
      iconUrl: './assets/driving-history/trip-map-marker.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
    this.startLocationIcon = L.icon({
      iconUrl: './assets/driving-history/start-location.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
    this.endLocationIcon = L.icon({
      iconUrl: './assets/driving-history/end-location.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
    this.eventLocationIcon = L.icon({
      iconUrl: './assets/driving-history/event-location.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
  }

  private getEventPointList(): Array<any>[] {
    let eventlocations = { lat: 0, lng: 0 };
    this.eventPoints = [];
    let eventCount: number = this.tripEvents.eventDetails.length;
    for (let pt = 0; pt < eventCount; pt++) {
      eventlocations = {
        lat: Number(this.tripEvents.eventDetails[pt].gpsLatitude),
        lng: Number(this.tripEvents.eventDetails[pt].gpsLongitude)
      };
      this.eventPoints.push(eventlocations);
    }
    return this.eventPoints;
  }


  private getRoutePointList(): Array<any>[] {
    let locations = { lat: 0, lng: 0 };
    this.routePoints = [];
    let gpsLength: number = this.trip.tripPackets.detail.gps.length;
    for (let gps = 0; gps < gpsLength; gps++) {
      for (let pt = 0; pt < this.trip.tripPackets.detail.gps[gps].length; pt++) {
        locations = {
          lat: Number(this.trip.tripPackets.detail.gps[gps][pt][1])
          , lng: Number(this.trip.tripPackets.detail.gps[gps][pt][2])
        };
        this.routePoints.push(locations);
      }
    }
    return this.routePoints;
  }

  public navigateToEventDetails() {
    this.router.navigate(['/event-detail']);
  }

  show() {
    const ref = this.dialogService.open(EventDetailsComponent, {
        width: '90%',
        showHeader: true,
        closable: true
    });
  }

}
