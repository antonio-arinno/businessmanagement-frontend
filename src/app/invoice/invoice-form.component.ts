import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../model/invoice';
import { InvoiceItem } from '../model/invoice-item';
import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html'
})
export class InvoiceFormComponent implements OnInit {

/*
  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;
*/

  titulo: string = 'Nueva Factura';
  invoice: Invoice = new Invoice();
  errores: string[];

  customers: Customer[] = [];

  customerControl = new FormControl();
  filteredCustomers: Observable<Customer[]>;

  autocompleteControl = new FormControl();
  filteredProducts: Observable<Product[]>;

  constructor(private invoiceService: InvoiceService) {
    this.invoiceService.getCustomers().subscribe(
      customers => this.customers = customers
    );
  }

  ngOnInit(): void {

    this.invoice.customer = new Customer();

    this.filteredProducts = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.description),
        flatMap(value => value ? this._filter(value) : [])
      );

    this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter3(value))
      );

  }



  private _filter3(value: string): Customer[] {
    return this.customers.filter(customer => customer.name.includes(value));
  }


  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.invoiceService.getProducts(filterValue);
  }

  showDescription(product?: Product): string | undefined {
    return product ? product.description : undefined;
  }

  selectCustomer(event: MatAutocompleteSelectedEvent): void {
    let customer = event.option.value as Customer;
    this.invoice.customer.id = customer.id;
    this.invoice.customer.name = customer.name;
    this.invoice.customer.code = customer.code;
    this.customerControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }


  onChangeCustomer3(event: any): void {
    console.log(event.target.value);
    console.log(this.invoice.customer.name);
    if(event.target.value === this.invoice.customer.name){
      console.log('iguales')
    } else {
      console.log('diferente')
    }

  }


  selectProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;

    if (this.existsItem(product.id)) {
      this.increaseQuantity(product.id);
    } else {
      let invoiceItem = new InvoiceItem();
      invoiceItem.product = product;
      invoiceItem.price = product.price;
      this.invoice.items.push(invoiceItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  existsItem(id: number): boolean {
    let exists = false;
    this.invoice.items.forEach((item: InvoiceItem) => {
      if (id === item.product.id) {
        exists = true;
      }
    });
    return exists;
  }

  increaseQuantity(id: number): void {
    this.invoice.items = this.invoice.items.map((item: InvoiceItem) => {
      if (id === item.product.id) {
        ++item.quantity;
      }
      return item;
    });
  }

  updateQuantity(id: number, event: any): void {
    let quantity: number = event.target.value as number;

    if (quantity == 0) {
      return this.deleteInvoiceItem(id);
    }

    this.invoice.items = this.invoice.items.map((item: InvoiceItem) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }
      return item;
    });
  }

  getTotal():number {
    let total: number = 0;
    this.invoice.items.forEach((item: InvoiceItem) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }



  deleteInvoiceItem(id: number): void {
    this.invoice.items = this.invoice.items.filter((item: InvoiceItem) => id !== item.product.id);
  }

  create(invoiceForm): void{

    this.invoiceService.create(this.invoice)
    .subscribe( response => {
//      this.router.navigate(['/logistics'])
      this.invoice.number = response.invoice.number;
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
