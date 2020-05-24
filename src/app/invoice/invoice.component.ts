import { Component, OnInit } from '@angular/core';
import { Invoice } from '../model/invoice';
import { InvoiceService } from '../services/invoice.service';
import Swal from 'sweetalert2';
import { AuthService } from '../user/auth.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {

  invoices: Invoice[];

  constructor(private invoiceService: InvoiceService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(
      invoices => this.invoices = invoices,
      err =>{
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    );
  }

  delete(invoice: Invoice): void {
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
        this.invoiceService.delete(invoice.id).subscribe(
          response => {
            this.invoices = this.invoices.filter(inv => inv !== invoice)
            Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }

}
