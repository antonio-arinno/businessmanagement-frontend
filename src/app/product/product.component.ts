import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { AuthService } from '../user/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  products: Product[];
  paginator: any;
  component= '/product';

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.productService.getProducts(page).subscribe(
        response => {
          this.products = response.content as Product[];
          this.paginator = response;
        });
      }
    );
  }

  delete(product: Product): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        this.productService.delete(product.id).subscribe(
          response => {
            this.products = this.products.filter(pro => pro !== product)
            Swal.fire(response.title , response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }


}
