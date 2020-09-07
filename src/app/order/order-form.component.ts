import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { Customer } from '../model/customer';
import { Product } from '../model/product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {

  titulo: string = 'New Order';
  order: Order = new Order();
  customer: Customer = new Customer();

  errores: string[];

  customers: Customer[] = [];

  customerCodeControl = new FormControl();
  filteredCustomersCode: Observable<Customer[]>;

  customerControl = new FormControl();
  filteredCustomers: Observable<Customer[]>;

  productControl = new FormControl();
  filteredProducts: Observable<Product[]>;

  constructor(private orderService: OrderService,
              private router: Router,
              private activateRoute: ActivatedRoute){
    this.order.customer = this.customer;
  }

  ngOnInit(): void {

    this.loadOrder();

    this.filteredProducts = this.productControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.description),
        flatMap(value => value ? this._filter(value) : [])
      );

    this.filteredCustomers = this.customerControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filterCustomer(value) : [])
      );

    this.filteredCustomersCode = this.customerCodeControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.code),
        flatMap(value => value ? this._filterCustomerCode(value) : [])
      );


  }

  loadOrder(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.orderService.getOrder(id)
          .subscribe((order) => {
            this.order = this.orderService.setOrder(order);
            this.titulo = 'Actualizar Orden';
          },
           err => {
             this.router.navigate(['/order'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });
      }
    })
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.orderService.getProducts(filterValue);
  }

  private _filterCustomer(value: string): Observable<Customer[]> {
    const filterValue = value.toLowerCase();
    return this.orderService.getCustomers(filterValue);
  }

  private _filterCustomerCode(value: string): Observable<Customer[]> {
    const filterValue = value.toLowerCase();
    return this.orderService.getCustomersCode(filterValue);
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;

    if (this.existsItem(product.id)) {
      this.increaseQuantity(product.id);
    } else {
      let orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.price = product.price;
      this.order.items.push(orderItem);
    }

    this.productControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  existsItem(id: number): boolean {
    let exists = false;
    this.order.items.forEach((item: OrderItem) => {
      if (id === item.product.id) {
        exists = true;
      }
    });
    return exists;
  }

  increaseQuantity(id: number): void {
    this.order.items = this.order.items.map((item: OrderItem) => {
      if (id === item.product.id) {
        ++item.quantity;
      }
      return item;
    });
  }

  selectCustomer(event: MatAutocompleteSelectedEvent): void {
    let customer = event.option.value as Customer;
    this.order.customer.id = customer.id;
    this.order.customer.name = customer.name;
    this.order.customer.code = customer.code;
    this.customerControl.setValue('');
    this.customerCodeControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updateQuantity(id: number, event: any): void {
    let quantity: number = event.target.value as number;

    if (quantity == 0) {
      return this.deleteOrderItem(id);
    }

    this.order.items = this.order.items.map((item: OrderItem) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }
      return item;
    });
  }

  deleteOrderItem(id: number): void {
    this.order.items = this.order.items.filter((item: OrderItem) => id !== item.product.id);
  }

  create(): void{
    console.log('create');

    this.orderService.create(this.order)
    .subscribe( response => {
      this.order.number = response.order.number;
      this.order.id = response.order.id;
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

  update():void{
    this.orderService.update(this.order)
    .subscribe ( order => {
      this.router.navigate(['/order'])
      Swal.fire('Orden Actualizado', 'Orden actualizada con exito', 'success')
    },
    err => {
      if(!err.error.errors){
        Swal.fire(err.error.error, err.error.message, 'error')
      }
      this.errores = err.error.errors as string [];
    }
    );
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
        link.download = `Ord_${this.order.id}.pdf`;
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
