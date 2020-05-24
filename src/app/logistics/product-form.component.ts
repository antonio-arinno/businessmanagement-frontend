import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'

})
export class ProductFormComponent implements OnInit {

  public product: Product = new Product();
  public titulo: string = "Crear Producto";
  public errores: string[];



  constructor(private productService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.loadProduct();
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
             this.router.navigate(['/logistics'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });
      }
    })
  }

  create(): void{
    this.productService.create(this.product)
    .subscribe( response => {
      this.router.navigate(['/logistics'])
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
      this.router.navigate(['/logistics'])
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

}
