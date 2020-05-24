import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from './company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private urlEndPoint: string = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) { }

  getCompany(): Observable<Company>{
    return this.http.get<Company>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

}
