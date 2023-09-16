import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  private baseUrl = config.baseUrl + config.wp;
  private headers = new HttpHeaders()
                      .set('Authorization', 'Basic ' + btoa(`${config.ourUser}:${config.ourPassword}`))
  constructor(private _apiService: ApiService) { }


  public uploadImageToWordpress(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    const url : string = `${this.baseUrl}/media`;
    return this._apiService.post(url, formData, this.headers);
  }
}
