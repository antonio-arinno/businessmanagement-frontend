import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../model/invoice';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html'
})
export class InvoiceViewComponent implements OnInit {

  invoice: Invoice;
  titulo: string = 'Invoice';

  constructor(private invoiceService: InvoiceService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.invoiceService.getInvoice(id).subscribe(invoice => {
        this.invoice = invoice;
        console.log(this.invoice);
      })
    })
  }

  pdf(): void {
    this.invoiceService.pdf(this.invoice.id).subscribe(
      response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `Inv_${this.invoice.id}_${this.invoice.customer.code}.pdf`;
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view:window}));
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
      err => {
        console.log(err);
        Swal.fire(err.name, err.message, 'error')
      }
    );
  }

}
