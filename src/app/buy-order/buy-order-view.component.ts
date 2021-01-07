import { Component, OnInit } from '@angular/core';
import { BuyOrderService } from '../services/buy-order.service';
import { BuyOrder } from '../model/buy-order';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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

  pdf(): void {
    this.buyOrderService.pdf(this.buyOrder.id).subscribe(
      response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `Alb_Compra_${this.buyOrder.number}_${this.buyOrder.provider.code}.pdf`;
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view:window}));
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
      err => {
        Swal.fire(err.name, err.message, 'error')
      }
    );
  }

}
