import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IdDates } from '../model/id-dates';
import { DateRange } from '../model/date-range';
import { Customer } from '../model/customer';
import { InvoiceService } from '../services/invoice.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-generate',
  templateUrl: './invoice-generate.component.html',
  styleUrls: ['./invoice-generate.component.css']
})
export class InvoiceGenerateComponent implements OnInit {

  public titulo: string = "Generar facturacion";
  idDates: IdDates = new IdDates();
  dateRange: DateRange = new DateRange();
  customerNameControl = new FormControl();
  filteredCustomersName: Observable<Customer[]>;

  constructor(public invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.idDates.dateRange = this.dateRange;
    this.filteredCustomersName = this.customerNameControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filterCustomerName(value) : [])
      );

  }

  private _filterCustomerName(value: string): Observable<Customer[]> {
    const filterValue = value.toLowerCase();
    return this.invoiceService.getCustomersName(filterValue);
  }

  selectCustomer(event: MatAutocompleteSelectedEvent): void {
    let customer = event.option.value as Customer;
    this.idDates.id  = customer.id;
    this.idDates.name = customer.name;
    this.customerNameControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  generate(): void{
    if(this.idDates.id){
      this.invoiceService.selectionGenerate(this.idDates).subscribe(
        response => {
          Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      );
    }else{
      this.invoiceService.dateSelectionGenerate(this.idDates.dateRange).subscribe(
        response => {
          Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      );
    }
  }

  modalClose(){
    this.invoiceService.modalClose();
    this.idDates = new IdDates();
    this.idDates.dateRange = new DateRange();
    window.location.reload();
  }




}
