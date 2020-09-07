import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html'
})
export class OrderViewComponent implements OnInit {

  order: Order;
  titulo: string = 'Order';

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.orderService.getOrder(id).subscribe(order => {
        this.order = this.orderService.setOrder(order);
      })
    })
  }

}
