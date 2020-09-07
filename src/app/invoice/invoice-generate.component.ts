import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-generate',
  templateUrl: './invoice-generate.component.html'
})
export class InvoiceGenerateComponent implements OnInit {

  public titulo: string = "Crear Cliente";

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  generate(): void{
    this.invoiceService.generate(100,200).subscribe(
      response => {
        Swal.fire(response.title, response.message,  'success');
      },err => {
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    )
    console.log('correcto');
  }




}
