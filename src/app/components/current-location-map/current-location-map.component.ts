import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-location-map',
  templateUrl: './current-location-map.component.html',
  styleUrls: ['./current-location-map.component.css']
})
export class CurrentLocationMapComponent implements OnInit {


  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() zoom: number = 10;

  centre:google.maps.LatLngLiteral={lat: 0, lng: 0};
  mapZoom:number = 10;
  markerPositions: google.maps.LatLngLiteral[] = [];

  options: google.maps.MapOptions = {
    restriction: {
      latLngBounds: {
        north: 60,
        south: -60,
        east: 100,
        west: -100
      },
      strictBounds: true
    }
  };

  ngOnInit(): void {
    this.centre = {lat: this.latitude, lng: this.longitude};

    this.mapZoom= this.zoom;

    this.markerPositions.push(this.centre);

  }

  




}
