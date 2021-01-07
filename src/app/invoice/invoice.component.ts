import { Component, OnInit } from '@angular/core';
import { Invoice } from '../model/invoice';
import { InvoiceService } from '../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../user/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {

  invoices: Invoice[];
  paginator: any;
  component= '/invoice';

  constructor(private invoiceService: InvoiceService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.invoiceService.getInvoices(page).subscribe(
        response => {
          this.invoices = response.content as Invoice[];
          this.paginator = response;
        });
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

  pdf(invoice: Invoice): void {
    this.invoiceService.pdf(invoice.id).subscribe(
      response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `Inv_${invoice.number}_${invoice.customer.code}.pdf`;
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

  generate(): void{
    this.invoiceService.generate().subscribe(
      response => {
        window.location.reload();
        Swal.fire(response.title, response.message, 'success');

      },err => {
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    )
  }

  modalOpen(){
    this.invoiceService.modalOpen();
  }



















}
