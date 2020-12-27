import { Component, OnInit } from '@angular/core';
import { BuyOrderService } from '../services/buy-order.service';
import { BuyOrder } from '../model/buy-order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-order-view',
  templateUrl: './buy-order-view.component.html'
})
export class BuyOrderViewComponent implements OnInit {

  buyOrder: BuyOrder;
  titulo: string = 'Order';

  constructor(private buyOrderService: BuyOrderService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.buyOrderService.getBuyOrder(id).subscribe(buyOrder => {
        this.buyOrder = this.buyOrderService.setBuyOrder(buyOrder);
      })
    })
  }

}
