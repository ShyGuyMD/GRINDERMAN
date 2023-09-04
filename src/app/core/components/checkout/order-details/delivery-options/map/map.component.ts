import { Component } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { ApiService, DeliveryService } from '@core/services';
import { Observable, forkJoin, map, of, } from 'rxjs';
import { config } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  map!: google.maps.Map;
  apiLoaded: Observable<boolean> = of(false);
  vertices: google.maps.LatLngLiteral[] = [];
  center!: google.maps.LatLngLiteral;
  zoom = 13;
  bookshopMarkerOptions: google.maps.MarkerOptions = { draggable: false, icon:'assets/images/bookshopMarker.png' };
  bookshopLocations: google.maps.LatLngLiteral[] = [];
  bookshopAddresses: string[] =
['Dr. Tristán Narvaja 1645, 11200 Montevideo, Departamento de Montevideo'];
  deliveryLocation!: google.maps.LatLngLiteral;

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
        this.setDeliveryArea(deliveryArea);
      }
    });

    this._deliveryService
    .getDeliveryMapAddress()
    .subscribe((deliveryAddress) => {
      if (deliveryAddress) {
        this.findMarker(deliveryAddress).subscribe(location => {
          if(location){
            this.deliveryLocation = location;
            this.center = location;
          }
        });
      }
    });
  }

 public initializeMap(map: google.maps.Map): void {
  this.map = map;
  const geocodeObservables = this.bookshopAddresses.map(address => this.findMarker(address));

  forkJoin(geocodeObservables).subscribe(locations => {
    locations.forEach(location => {
      if (location) {
        this.bookshopLocations.push(location);
        this.addBookshopMarker(location);
      }
    });

    this.center = this.bookshopLocations[0];
  });
  }

  private findMarker(address: string): Observable<google.maps.LatLngLiteral | null> {
    return this._geocoder.geocode({ address }).pipe(
      map(({ results }) => (results.length > 0 ? results[0].geometry.location.toJSON() : null))
    );
  }

  private addBookshopMarker(location: google.maps.LatLngLiteral) {
    this.bookshopLocations.push(location);
  }

  private setDeliveryArea(deliveryArea: google.maps.LatLngLiteral[]): void {
    if (deliveryArea) {
       this.vertices = deliveryArea;
      }
      this.vertices = [...this.vertices];
    
  }
}
