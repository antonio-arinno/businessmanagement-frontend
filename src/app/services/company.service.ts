import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private urlEndPoint: string = URL_BACKEND + '/api/companies';

  constructor(private http: HttpClient, private router: Router) { }

  getCompany(): Observable<Company>{
    console.log('getCompany');
    return this.http.get<Company>(`${this.urlEndPoint}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.messaje){
          this.router.navigate(['/customer']);
        }
        return throwError(e);
      })
    )
  }

  update(company: Company): Observable<Company>{
    return this.http.put(`${this.urlEndPoint}`, company).pipe(
      map((response: any) => response.company as Company),
      catchError(e => {

        if(e.status==400){
            return throwError(e);
        }
        console.error('update', e);
        return throwError(e);
      })
    );
  }

}
