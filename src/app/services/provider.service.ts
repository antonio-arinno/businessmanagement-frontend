import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../config/config';
import { Provider } from '../model/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private urlEndPoint: string = URL_BACKEND + '/api/providers';

  constructor(private http: HttpClient, private router: Router) { }

  getProviders(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as Provider[]).map(provider => {
    //        provider.name = provider.name.toUpperCase();
            return provider;
        });
        return response;
      })
    );
  }

  getProvider(id: number): Observable<Provider>{
    return this.http.get<Provider>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.messaje){
          this.router.navigate(['/provider']);
        }
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<any>{
    return this.http.delete<Provider>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  create(provider: Provider): Observable<Provider>{
    return this.http.post<Provider>(this.urlEndPoint, provider).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(provider: Provider): Observable<Provider>{
    return this.http.put(`${this.urlEndPoint}/${provider.id}`, provider).pipe(
      map((response: any) => response.provider as Provider),
      catchError(e => {
        return throwError(e);
      })
    );
  }





















}
