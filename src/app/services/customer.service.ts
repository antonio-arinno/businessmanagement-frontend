import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint: string = URL_BACKEND + '/api/customers';

//  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

/*
  getCustomers(): Observable<Customer[]>{
    return this.http.get(this.urlEndPoint).pipe(
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
*/

  getCustomers(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as Customer[]).map(customer => {
            customer.name = customer.name.toUpperCase();
            return customer;
        });
        return response;
      })
    );
  }


  create(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.urlEndPoint, customer).pipe(
      catchError(e => {
/*
        if(e.status==400){
            console.error('e', e);
            return throwError(e);
        }
        console.error('e', e);
*/
        return throwError(e);
      })
    );
  }

  getCustomer(id): Observable<Customer>{
    return this.http.get<Customer>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.messaje){
          this.router.navigate(['/customer']);
        }
        return throwError(e);
      })
    )

  }

  update(customer: Customer): Observable<Customer>{
    return this.http.put(`${this.urlEndPoint}/${customer.id}`, customer).pipe(
      map((response: any) => response.customer as Customer),
      catchError(e => {

        if(e.status==400){
            return throwError(e);
        }
        console.error('update', e);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<Customer>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
