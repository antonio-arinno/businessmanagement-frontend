import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlEndPoint: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Product[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map ( response => {
        let products = response as Product[];
        return products.map(product => {
            product.description = product.description.toUpperCase();
            return product;
        });
      }
    )
    );
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.messaje){
          this.router.navigate(['/product']);
        }
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<any>{
    return this.http.delete<Product>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  create(product: Product): Observable<any>{
    return this.http.post<Product>(this.urlEndPoint, product).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(product: Product): Observable<any>{
    return this.http.put(`${this.urlEndPoint}/${product.id}`, product).pipe(
//      map((response: any) => response.product as Product),
      catchError(e => {
        if(e.status==400){
            return throwError(e);
        }
        return throwError(e);
      })
    );
  }



}
