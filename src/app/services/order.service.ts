import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urlEndPoint: string = URL_BACKEND + '/api/orders';

  constructor(private http: HttpClient) { }

/*
  getOrders(): Observable<Order[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map ( response => {
        let order = response as Order[];
        return order.map(order => {
            return order;
        });
      }
    )
    );
  }
*/

  getOrders(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as Order[]).map(order => {
            return order;
        });
        return response;
      })
    );
  }

  getOrder(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
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

  getCustomers(term: string): Observable<Customer[]>{
    return this.http.get(`${this.urlEndPoint}/load-customer/${term}`).pipe(
      map ( response => {
        let customer = response as Customer[];
        return customer.map(customer => {
            return customer;
        });
      }
    )
    );
  }


  getCustomersCode(term: string): Observable<Customer[]>{
    return this.http.get(`${this.urlEndPoint}/load-customer-code/${term}`).pipe(
      map ( response => {
        let customer = response as Customer[];
        return customer.map(customer => {
            return customer;
        });
      }
    )
    );
  }


  create(order: Order): Observable<any>{
    return this.http.post<Order>(this.urlEndPoint, order).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(order: Order): Observable<Order>{
    return this.http.put(`${this.urlEndPoint}/${order.id}`, order).pipe(
      map((response: any) => response.order as Order),
      catchError(e => {
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<Order>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  setOrder(order: Order): Order{
    let setOrder: Order = new Order();
    setOrder.id = order.id;
    setOrder.number = order.number;
    setOrder.customer = order.customer;
    setOrder.createAt = order.createAt;
    setOrder.observation = order.observation;
    for (let item of order.items){
        let itemTemp = new OrderItem();
        itemTemp.id = item.id;
        itemTemp.price = item.price;
        itemTemp.discount = item.discount;
        itemTemp.product = item.product;
        itemTemp.quantity = item.quantity;
        itemTemp.iva = item.iva;
        itemTemp.ivaType = item.ivaType;
        itemTemp.lot = item.lot;
        setOrder.items.push(itemTemp)
    }
    return setOrder;
  }

  pdf(id: number): Observable<Blob>{
    return this.http.get(`${this.urlEndPoint}/pdf/${id}`, { responseType : 'blob'  });
  }

}
