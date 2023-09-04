import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiService } from '../api';
import { City, CityImport } from '@core/models/city';
import { Departamento } from '@core/models/departamento';
import * as wellknown from 'wellknown';
import proj4 from 'proj4';
import { DeliveryZoneImport } from '@core/models/deliveryZoneImport';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private deliveryMapAddress$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private deliveryArea$: BehaviorSubject<google.maps.LatLngLiteral[]> =
    new BehaviorSubject<google.maps.LatLngLiteral[]>([]);
  private departamentos$: BehaviorSubject<Departamento[]> = new BehaviorSubject<
    Departamento[]
  >([]);

  constructor(private _apiService: ApiService) {
    this.loadCities().subscribe((departamentos: Departamento[]) => {
      this.setDepartamentos(departamentos.sort());
    });
    this.loadDeliveryService().subscribe(
      (area: google.maps.LatLngLiteral[]) => {
        this.setDeliveryArea(area);
      }
    );
  }

  public getDepartamentos(): Observable<Departamento[]> {
    return this.departamentos$.asObservable();
  }

  public setDepartamentos(departamentos: Departamento[]): void {
    this.departamentos$.next(departamentos);
  }

  public getDeliveryMapAddress(): Observable<string> {
    return this.deliveryMapAddress$.asObservable();
  }

  public setDeliveryMapAddress(address: string): void {
    console.log("set", address)
    this.deliveryMapAddress$.next(address);
  }

  public getDeliveryArea(): Observable<google.maps.LatLngLiteral[]> {
    return this.deliveryArea$.asObservable();
  }

  public setDeliveryArea(area: google.maps.LatLngLiteral[]): void {
    console.log('set', area);
    this.deliveryArea$.next(area);
  }

  private loadCities(): Observable<Departamento[]> {
    return this._apiService.loadCSVData('assets/csv/localidades.csv').pipe(
      map((data: CityImport[]) => {
        const departamentoMap = new Map<string, Departamento>();

        data.forEach((city: CityImport) => {
          if (!departamentoMap.has(city.departamento)) {
            departamentoMap.set(city.departamento, {
              name: city.departamento,
              cities: [],
            });
          }
          const geoJsonData = wellknown.parse(city.wkt);
          let area: google.maps.LatLngLiteral[] = [];
          if (
            geoJsonData &&
            geoJsonData.type === 'MultiPolygon' &&
            Array.isArray(geoJsonData.coordinates)
          ) {
            const flattenedCoordinates = geoJsonData.coordinates.flat(2);
            area = this.convertCoordinates(flattenedCoordinates);
          }

          const mappedCity: City = {
            localidad: city.localidad,
            departamento: city.departamento,
            area: area,
          };
          departamentoMap.get(city.departamento)?.cities.push(mappedCity);
        });

        // Convert the map values into an array
        return Array.from(departamentoMap.values());
      })
    );
  }

  // Conversion function from EPSG 32721 to EPSG 4326
  private convertCoordinates(
    coordinates: number[][]
  ): google.maps.LatLngLiteral[] {
    return coordinates.map((coord) => this.convertToLatLng(coord));
  }

  // Transform a single coordinate from EPSG 32721 to EPSG 4326
  private convertToLatLng(coordinate: number[]): google.maps.LatLngLiteral {
    proj4.defs(
      'EPSG:32721',
      '+proj=utm +zone=21 +south +datum=WGS84 +units=m +no_defs'
    );
    proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

    const transformedCoords = proj4('EPSG:32721', 'EPSG:4326', coordinate);
    const [lng, lat] = transformedCoords;
    return { lat, lng };
  }

  private loadDeliveryService(): Observable<google.maps.LatLngLiteral[]> {
    return this._apiService.loadCSVData('assets/csv/zonaDeEnvio.csv').pipe(
      map((data: DeliveryZoneImport[]) => {
        console.log('data', data);
        const zoneMap = new Map<string, google.maps.LatLngLiteral[]>();

        data.forEach((node: DeliveryZoneImport) => {
          const geoJsonData = wellknown.parse(node.wkt);
          let area: google.maps.LatLngLiteral[] = [];

          if (
            geoJsonData &&
            geoJsonData.type === 'Polygon' &&
            Array.isArray(geoJsonData.coordinates)
          ) {
            const flattenedCoordinates = geoJsonData.coordinates.flat(1);
            area = flattenedCoordinates.map((x: any) => ({
              lat: x[1],
              lng: x[0],
            }));
          }

          zoneMap.set(node.nombre, area);
        });

        return Array.from(zoneMap.values()).flat();
      })
    );
  }
}
