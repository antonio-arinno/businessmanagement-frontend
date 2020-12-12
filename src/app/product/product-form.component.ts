import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Provider } from '../model/provider';
import { IvaType } from '../model/iva-type.enum';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  public product: Product = new Product();
  public provider: Provider = new Provider();
  public titulo: string = "Crear Producto";
  public errores: string[];

  providers: Provider[] = [];

  providerNameControl = new FormControl();
  filteredProvidersName: Observable<Provider[]>;

  ivaTypes : any[] = [];



  constructor(private productService: ProductService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
      this.product.provider = this.provider;
    }

  ngOnInit(): void {
      this.loadProduct();

      for(let item in IvaType) {
        if(isNaN(Number(item))){
          this.ivaTypes.push({text: item, value: IvaType[item]});
        }
      }

      this.filteredProvidersName = this.providerNameControl.valueChanges
        .pipe(
          map(value => typeof value === 'string' ? value : value.name),
          flatMap(value => value ? this._filterProviderName(value) : [])
        );
  }

  loadProduct(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.productService.getProduct(id)
          .subscribe((product) => {
            this.product = product;
            this.titulo = 'Actualizar Producto';
          },
           err => {
             this.router.navigate(['/product'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });
      }
    })
  }

  create(): void{
    this.productService.create(this.product)
    .subscribe( response => {
      this.router.navigate(['/product'])
      Swal.fire(response.title, response.message,  'success');
    },
    err => {
      if(!err.error.errors){
        Swal.fire(err.error.error, err.error.message, 'error')
      }
      this.errores = err.error.errors as string [];
    }
    );
  }

  update():void{
    this.productService.update(this.product)
    .subscribe ( response => {
      this.router.navigate(['/product'])
      Swal.fire(response.title, response.message,  'success');
    },
    err => {
      if(!err.error.errors){
        Swal.fire(err.error.error, err.error.message, 'error')
      }
      this.errores = err.error.errors as string [];
    }
    );
  }

  private _filterProviderName(value: string): Observable<Provider[]> {
    const filterValue = value.toLowerCase();
    return this.productService.getProviderName(filterValue);
  }

  selectProvider(event: MatAutocompleteSelectedEvent): void {
    let provider = event.option.value as Provider;
    this.product.provider.id = provider.id;
    this.product.provider.name = provider.name;
    this.providerNameControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

}
