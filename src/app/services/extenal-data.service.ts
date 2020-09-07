import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
