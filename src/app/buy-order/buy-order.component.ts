import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { BuyOrderService } from '../services/buy-order.service';
import { BuyOrder } from '../model/buy-order';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-order',
  templateUrl: './buy-order.component.html'
})
export class BuyOrderComponent implements OnInit {

  buyOrders: BuyOrder[];
  paginator: any;
  component= '/buy-order';


  constructor(private buyOrderService: BuyOrderService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.buyOrderService.getBuyOrders(page).subscribe(
        response => {
          this.buyOrders = response.content as BuyOrder[];
          console.log(this.buyOrders);
          this.paginator = response;
        });
      }
    );
  }

  delete(buyOrder: BuyOrder): void {
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
        this.buyOrderService.delete(buyOrder.id).subscribe(
          response => {
            this.buyOrders = this.buyOrders.filter(ord => ord !== buyOrder)
            Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }



}
