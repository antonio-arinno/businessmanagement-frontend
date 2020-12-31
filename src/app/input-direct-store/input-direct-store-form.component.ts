import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InputDirectStoreService } from '../services/input-direct-store.service';
import { Product } from '../model/product';
import { InputDirectStore } from '../model/input-direct-store';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-direct-store-form',
  templateUrl: './input-direct-store-form.component.html'
})
export class InputDirectStoreFormComponent implements OnInit {

  public inputDirectStore: InputDirectStore = new InputDirectStore();
  public product: Product = new Product();
  public titulo: string = "Entrada Directo Almacen";
  public errores: string[];

  productDescriptionControl = new FormControl();
  filteredDescriptionProducts: Observable<Product[]>;

  constructor(private inputDirectStoreService: InputDirectStoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.inputDirectStore.product = this.product;
    this.filteredDescriptionProducts = this.productDescriptionControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.description),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.inputDirectStoreService.getProducts(filterValue);
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;
    this.inputDirectStore.product = product;
    this.productDescriptionControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  create(): void{
    this.inputDirectStoreService.create(this.inputDirectStore)
    .subscribe( response => {
      this.router.navigate(['/input-direct-store'])
      Swal.fire(response.title, response.message,  'success');;
    },
    err => {
      if(!err.error.errors){
        Swal.fire(err.error.error, err.error.message, 'error')
      }
      this.errores = err.error.errors as string [];
    }
    );
  }


}
