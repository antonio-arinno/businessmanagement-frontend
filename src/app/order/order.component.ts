import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      err =>{
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    );
  }

  delete(order: Order): void {
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
        this.orderService.delete(order.id).subscribe(
          response => {
            this.orders = this.orders.filter(ord => ord !== order)
            Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }

}
