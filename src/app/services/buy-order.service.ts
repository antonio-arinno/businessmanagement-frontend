import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BuyOrder } from '../model/buy-order';
import { BuyOrderItem } from '../model/buy-order-item';
import { Provider } from '../model/provider';
import { Product } from '../model/product';

import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class BuyOrderService {

  private urlEndPoint: string = URL_BACKEND + '/api/buy-orders';

  constructor(private http: HttpClient) { }

  getBuyOrders(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as BuyOrder[]).map(buyOrder => {
            return buyOrder;
        });
        return response;
      })
    );
  }

  getBuyOrder(id: number): Observable<BuyOrder>{
    return this.http.get<BuyOrder>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getProviderName(term: string): Observable<Provider[]>{
    return this.http.get(`${this.urlEndPoint}/load-provider-name/${term}`).pipe(
      map ( response => {
        let provider = response as Provider[];
        return provider.map(provider => {
            return provider;
        });
      }
    )
    );
  }

  getProducts(idProvider: number, term: string): Observable<Product[]>{
    return this.http.get(`${this.urlEndPoint}/load-product/${idProvider}/${term}`).pipe(
      map ( response => {
        let product = response as Product[];
        return product.map(product => {
            return product;
        });
      }
    )
    );
  }

  setBuyOrder(buyOrder: BuyOrder): BuyOrder{
    let setBuyOrder: BuyOrder = new BuyOrder();
    setBuyOrder.id = buyOrder.id;
    setBuyOrder.number = buyOrder.number;
    setBuyOrder.provider = buyOrder.provider;
    setBuyOrder.createAt = buyOrder.createAt;
    setBuyOrder.observation = buyOrder.observation;
    for (let item of buyOrder.items){
        let itemTemp = new BuyOrderItem();
        itemTemp.id = item.id;
        itemTemp.price = item.price;
        itemTemp.discount = item.discount;
        itemTemp.product = item.product;
        itemTemp.quantity = item.quantity;
        itemTemp.iva = item.iva;
        itemTemp.ivaType = item.ivaType;
        itemTemp.lot = item.lot;
        setBuyOrder.items.push(itemTemp)
    }
    return setBuyOrder;
  }

  create(buyOrder: BuyOrder): Observable<any>{
    return this.http.post<BuyOrder>(this.urlEndPoint, buyOrder).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(buyOrder: BuyOrder): Observable<BuyOrder>{
    return this.http.put(`${this.urlEndPoint}/${buyOrder.id}`, buyOrder).pipe(
      map((response: any) => response.buyOrder as BuyOrder),
      catchError(e => {
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<BuyOrder>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  pdf(id: number): Observable<Blob>{
    return this.http.get(`${this.urlEndPoint}/pdf/${id}`, { responseType : 'blob'  });
  }








}
