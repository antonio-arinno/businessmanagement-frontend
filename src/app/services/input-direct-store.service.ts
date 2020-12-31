import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { InputDirectStore } from '../model/input-direct-store';
import { Product } from '../model/product';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class InputDirectStoreService {

  private urlEndPoint: string = URL_BACKEND + '/api/inputs-directs-store';

  constructor(private http: HttpClient) { }

  getInputsDirectsStore(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as InputDirectStore[]).map(provider => {
            return provider;
        });
        return response;
      })
    );
  }

  create(inputDirectStore: InputDirectStore): Observable<any>{
    return this.http.post<InputDirectStore>(this.urlEndPoint, inputDirectStore).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getProducts(term: string): Observable<Product[]>{
    return this.http.get(`${this.urlEndPoint}/load-product/${term}`).pipe(
      map ( response => {
        let product = response as Product[];
        return product.map(product => {
            return product;
        });
      }
    )
    );
  }




}
