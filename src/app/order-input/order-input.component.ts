import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BuyOrderService } from '../services/buy-order.service';
import { BuyOrder } from '../model/buy-order'

@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html'
})
export class OrderInputComponent implements OnInit {

  buyOrders: BuyOrder[];
  paginator: any;
  component= '/order-input';

  constructor(private buyOrderService: BuyOrderService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.buyOrderService.getPendingBuyOrders(page).subscribe(
        response => {
          this.buyOrders = response.content as BuyOrder[];
          this.paginator = response;
        });
      }
    );
  }

}
