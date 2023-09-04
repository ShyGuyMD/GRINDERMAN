import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(
    url: string,
    headers: HttpHeaders = new HttpHeaders(),
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http.get(url, { headers, params });
  }

  public post(
    url: string,
    body: any,
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.http.post(url, body, { headers });
  }

  public put(
    url: string,
    body: any,
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.http.put(url, body, { headers });
  }

  public jsonp(url: string): Observable<any> {
    return this.http.jsonp(url, 'callback');
  }

  public loadCSVData(path: string): Observable<any[]> {
    return this.http.get(path, { responseType: 'text' }).pipe(
      map((csvData: string) => {
        const result = [];
        csvData = csvData.replace(/"/g, '').trim();
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
          const obj: any = {};
          const currentLine = lines[i].split(',');

          for (let j = 0; j < headers.length; j++) {
            const header = headers[j].trim();
            let value = currentLine[j].trim();

            // Check if the column contains a MultiPolygon WKT string
            if (header === 'wkt') {
              // Combine all values in the column
              for (let k = j + 1; k < currentLine.length; k++) {
                value += `,${currentLine[k].trim()}`;
              }
            }

            obj[header] = value;
          }

          result.push(obj);
        }
        return result;
      })
    );
  }
}
