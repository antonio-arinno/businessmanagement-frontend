import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyOrderService } from '../services/buy-order.service';
import { BuyOrder } from '../model/buy-order';
import { BuyOrderItem } from '../model/buy-order-item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-input-form',
  templateUrl: './order-input-form.component.html'
})
export class OrderInputFormComponent implements OnInit {

  buyOrder: BuyOrder;
  titulo: string = 'Pedido de compra';
  errores: string[];

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

  updateLot(id: number, event: any): void {
    let lot: string = event.target.value as string;
    this.buyOrder.items = this.buyOrder.items.map((item: BuyOrderItem) => {
      if (id === item.product.id) {
        item.lot = lot;
      }
      return item;
    });
  }

  updateStore():void{
    this.buyOrderService.updateStore(this.buyOrder)
    .subscribe ( response => {
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
