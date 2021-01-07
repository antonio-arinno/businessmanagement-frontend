import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Invoice } from '../model/invoice';
import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { IdDates } from '../model/id-dates';
import { DateRange } from '../model/date-range';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private urlEndPoint: string = URL_BACKEND + '/api/invoices';

  public modal: boolean = false;

  constructor(private http: HttpClient) { }

  getInvoices(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as Invoice[]).map(invoice => {
            return invoice;
        });
        return response;
      })
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
    return this.http.post<Invoice>(this.urlEndPoint, invoice).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  sendEmail(id: number): Observable<any>{
    return this.http.get(`${this.urlEndPoint}/email/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  generate(): Observable<any>{
    return this.http.get(`${this.urlEndPoint}/generate`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  selectionGenerate(idDates: IdDates): Observable<any>{
    return this.http.post<IdDates>(`${this.urlEndPoint}/generate/id-dates`, idDates).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  dateSelectionGenerate(dateRange: DateRange): Observable<any>{
    return this.http.post<IdDates>(`${this.urlEndPoint}/generate/dates`, dateRange).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  pdf(id: number): Observable<Blob>{
    return this.http.get(`${this.urlEndPoint}/pdf/${id}`, { responseType : 'blob'  });
  }

  getCustomersName(term: string): Observable<Customer[]>{
    return this.http.get(`${this.urlEndPoint}/load-customer-name/${term}`).pipe(
      map ( response => {
        let customer = response as Customer[];
        return customer.map(customer => {
            return customer;
        });
      }
    )
    );
  }

  modalOpen(){
    this.modal = true;
  }

  modalClose(){
    this.modal = false;
  }



}
