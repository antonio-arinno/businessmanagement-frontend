import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../model/invoice';
import { ActivatedRoute } from '@angular/router';

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
      })
    })
  }

}
