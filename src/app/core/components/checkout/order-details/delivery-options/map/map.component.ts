import { Component } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { ApiService } from '@core/services';
import { Observable, map, catchError, of } from 'rxjs';
import { config } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  apiLoaded: Observable<boolean> = of(false);
  vertices: google.maps.LatLngLiteral[] = [];
  center!: google.maps.LatLngLiteral;
  zoom = 13;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  bookshopAddress: string = 'Dr. Tristán Narvaja 1645, 11200 Montevideo, Departamento de Montevideo';
  bookshopLocation!:  google.maps.LatLngLiteral;
  radiusInMeters: number = 3*1000;
  polygonOptions: google.maps.PolygonOptions = {
    fillColor: '#00FF00',
    fillOpacity: 0.35,
    strokeColor: '#00FF00',
    strokeOpacity: 1,
    strokeWeight: 2,
  };

  constructor(private _apiService: ApiService, private _geocoder: MapGeocoder) {

    this._apiService.jsonp(`${config.gmUrl}${config.gmApiKey}`).subscribe( {
      next: () => {
        this.apiLoaded = of(true);
        this.inicializeMap(this.bookshopAddress);
      },
      error: (e) => {
          console.log('Error: ', e);
          return of(false);
      }
  } )
}

  private inicializeMap(address: string): void{
    this._geocoder.geocode({ address }).subscribe(({ results }) => {
      if (results.length > 0) {
        const location = results[0].geometry.location.toJSON();;
        this.addMarker(location);
        this.bookshopLocation = location;
        this.calculateAreaOfDelivery();
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
        const location = results[0].geometry.location.toJSON();;
        this.addMarker(location);
      } else {
        console.log('No results found for the address.');
      }
    });
  }

  private calculateAreaOfDelivery():void{
    for (let angle = 0; angle < 360; angle += 10) {
      const heading = google.maps.geometry.spherical.computeHeading(this.bookshopLocation, this.bookshopLocation);
      const point = google.maps.geometry.spherical.computeOffset(this.bookshopLocation, this.radiusInMeters, heading + angle);
      this.vertices.push(point.toJSON());
      console.log("area of delivery", this.vertices)
    }
    this.vertices = [...this.vertices];
  }
  
}
