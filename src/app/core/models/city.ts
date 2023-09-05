
export interface City {
    departamento: string;
    localidad: string;
    area: google.maps.LatLngLiteral[];
  }

export interface CityImport {
id: number;
gid: number;
departamento: string;
localidad: string;
wkt: string;
}