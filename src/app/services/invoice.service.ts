import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private urlEndPoint: string = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map ( response => {
        let invoice = response as Invoice[];
        return invoice.map(invoice => {
            return invoice;
        });
      }
    )
    );
  }

  getInvoice(id: number): Observable<Invoice>{
    return this.http.get<Invoice>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<any>{
    return this.http.delete<Invoice>(`${this.urlEndPoint}/${id}`).pipe(
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

  getCustomers(): Observable<Customer[]>{
    return this.http.get(`${this.urlEndPoint}/customers`).pipe(
      map ( response => {
        let customers = response as Customer[];
        return customers.map(customer => {
            customer.name = customer.name.toUpperCase();
            return customer;
        });
      }
    )
    );
  }



  create(invoice: Invoice): Observable<any>{
    return this.http.post<Product>(this.urlEndPoint, invoice).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }


}
