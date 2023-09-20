import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { WordPressImageResponse } from '@core/models/response/wordPressImageResponse';
import { CreateAdminRequest } from '@core/models/request/createAdminRequest';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  private baseUrl = config.baseUrl + config.wp;
  private headers = new HttpHeaders()
                      .set('Authorization', 'Basic ' + btoa(`${config.ourUser}:${config.ourPassword}`))
  constructor(private _apiService: ApiService) { }


  public uploadImagesToWordpress(files: File[]): Observable<WordPressImageResponse[]> {
    const url: string = `${this.baseUrl}/media`;
  
    const uploadObservables: Observable<WordPressImageResponse>[] = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      return this._apiService.post(url, formData, this.headers);
    });
  
    return forkJoin(uploadObservables);
  }

  public postAdmin(body: CreateAdminRequest): any {
    const url = `${this.baseUrl}/users`;
    console.log("request", body)

    return this._apiService.post(url, body, this.headers);
}
}
