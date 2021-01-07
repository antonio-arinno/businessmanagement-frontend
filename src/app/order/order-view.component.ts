import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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

  pdf(): void {
    this.orderService.pdf(this.order.id).subscribe(
      response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `Ord_${this.order.number}_${this.order.customer.code}.pdf`;
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
