import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtenalDataService {

  private urlEndPoint: string = URL_BACKEND + '/api/upload';


  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any>{
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.urlEndPoint, formData).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }


  uploadFileProduct(file: File): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest('POST', `${this.urlEndPoint}/product`, formData, {
      reportProgress: true
    });
    return this.http.request(req);

  }
/*
  uploadFileProduct(file: File): Observable<any>{
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.urlEndPoint}/product`, formData).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
*/





}
