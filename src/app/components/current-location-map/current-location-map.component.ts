import { Component, Input, OnInit } from '@angular/core';
import { Coordinates } from 'src/app/_models/location';
import { LocationService } from 'src/app/_services/location.service';

@Component({
  selector: 'app-current-location-map',
  templateUrl: './current-location-map.component.html',
  styleUrls: ['./current-location-map.component.css']
})
export class CurrentLocationMapComponent implements OnInit {


  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() zoom: number = 10;

  private previousCoords:Coordinates={lat:0,long:0};
  private locationOffSet:number=0.15;

  constructor(private locationService:LocationService){

    this.onLocationModified = this.onLocationModified.bind(this);

  }

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

  private onLocationModified(location:Coordinates)
  {
    const previousLocationSum= this.previousCoords.lat+this.previousCoords.long;
    const currentLocationSum= location.lat+location.long;

    if(Math.abs(previousLocationSum-currentLocationSum)>this.locationOffSet)
    {
      this.centre = {lat: location.lat, lng: location.long};

      this.mapZoom= this.zoom;
      this.markerPositions = [];
      this.markerPositions.push(this.centre);


    }

   
  }

  ngOnInit(): void {
    this.locationService.onLocationAdded(this.onLocationModified);
    this.locationService.onLocationChanged(this.onLocationModified);

   

  }



  




}
