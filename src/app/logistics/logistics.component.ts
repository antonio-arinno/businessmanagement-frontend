import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { AuthService } from '../user/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html'
})
export class LogisticsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products
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
            Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }

}
