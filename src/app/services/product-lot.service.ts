import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_BACKEND } from '../config/config';
import { ProductLot } from '../model/product-lot';


@Injectable({
  providedIn: 'root'
})
export class ProductLotService {

  private urlEndPoint: string = URL_BACKEND + '/api/products-lots';

  constructor(private http: HttpClient) { }

  getProductsLots(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as ProductLot[]).map(provider => {
            return provider;
        });
        return response;
      })
    );
  }
}
