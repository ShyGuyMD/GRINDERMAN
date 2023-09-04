import { Component } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { ApiService, DeliveryService } from '@core/services';
import { Observable, of, } from 'rxjs';
import { config } from 'src/environments/environment';
import * as wellknown from 'wellknown';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  map!: google.maps.Map;
  apiLoaded: Observable<boolean> = of(false);
  vertices: google.maps.LatLngLiteral[] = [
    {lat: -31.419842283144572, lng : -58.000719813595374},
    {lat: -13, lng: 0},
    {lat: 13, lng: -13},
  ];
  center!: google.maps.LatLngLiteral;
  zoom = 13;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  bookshopAddress: string =
    'Dr. Tristán Narvaja 1645, 11200 Montevideo, Departamento de Montevideo';
  bookshopLocation!: google.maps.LatLngLiteral;
  deliveryLocation!: google.maps.LatLngLiteral;
  radiusInMeters: number = 3 * 1000;
  polygonOptions: google.maps.PolygonOptions = {
    fillColor: '#00FF00',
    fillOpacity: 0.35,
    strokeColor: '#00FF00',
    strokeOpacity: 1,
    strokeWeight: 2,
  };

  constructor(
    private _apiService: ApiService,
    private _geocoder: MapGeocoder,
    private _deliveryService: DeliveryService
  ) {
    this._apiService.jsonp(`${config.gmUrl}${config.gmApiKey}`).subscribe({
      next: () => {
        this.apiLoaded = of(true);
        console.log("dl.kmds")
      },
      error: (e) => {
        console.log('Error: ', e);
        return of(false);
      },
    });

    this._deliveryService
    .getDeliveryArea()
    .subscribe((deliveryArea) => {
      if (deliveryArea) {
        console.log("del", deliveryArea)
        this.setDeliveryArea(deliveryArea);
      }
    });
  }

 public initializeMap(event: any): void {

    console.log("evt", event)
    this.map = event;

    const address = this.bookshopAddress;
    this._geocoder.geocode({ address }).subscribe(({ results }) => {
      if (results.length > 0) {
        const location = results[0].geometry.location.toJSON();
        this.addMarker(location);
        this.bookshopLocation = location;
        //this.calculateAreaOfDelivery();
      } else {
        console.log('No results found for the address.');
      }
    });
  }

  private addMarker(location: google.maps.LatLngLiteral) {
    this.center = location;
    this.markerPositions.push(location);
  }

  public geocodeAddress(address: string): void {
    this._geocoder.geocode({ address }).subscribe(({ results }) => {
      if (results.length > 0) {
        const location = results[0].geometry.location.toJSON();
        this.addMarker(location);
      } else {
        console.log('No results found for the address.');
      }
    });
  }

  private calculateAreaOfDelivery(): void {

  }

  private setDeliveryArea(deliveryArea: google.maps.LatLngLiteral[]): void {
    if (deliveryArea) {
       this.vertices = deliveryArea;
      }
      this.vertices = [...this.vertices];
    
  }
}
