import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BuyOrderService } from '../services/buy-order.service';
import { Provider } from '../model/provider';
import { BuyOrder } from '../model/buy-order';
import { BuyOrderItem } from '../model/buy-order-item';
import { Product } from '../model/product';
import { Iva } from '../model/iva';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-order-form',
  templateUrl: './buy-order-form.component.html'
})
export class BuyOrderFormComponent implements OnInit {

  titulo: string = 'Nuevo Pedido de Compra';
  buyOrder: BuyOrder = new BuyOrder();
  provider: Provider = new Provider();
  iva: Iva = new Iva();
  errores: string[];
  providers: Provider[] = [];

  providerNameControl = new FormControl();
  filteredProvidersName: Observable<Provider[]>;

  productControl = new FormControl();
  filteredProducts: Observable<Product[]>;

  constructor(private buyOrderService: BuyOrderService,
              private router: Router,
              private activateRoute: ActivatedRoute) {

    this.buyOrder.provider = this.provider;

  }

  ngOnInit(): void {
    this.loadBuyOrder();
    this.filteredProducts = this.productControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.description),
        flatMap(value => value ? this._filter(value) : [])
      );

    this.filteredProvidersName = this.providerNameControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.code),
        flatMap(value => value ? this._filterProviderName(value) : [])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    console.log(this.buyOrder.provider);
    return this.buyOrderService.getProducts(this.buyOrder.provider.id, filterValue);
  }


  private _filterProviderName(value: string): Observable<Provider[]> {
    const filterValue = value.toLowerCase();
    return this.buyOrderService.getProviderName(filterValue);
  }

  loadBuyOrder(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.buyOrderService.getBuyOrder(id)
          .subscribe((order) => {
            this.buyOrder = this.buyOrderService.setBuyOrder(order);
            this.titulo = 'Actualizar Orden Pedido de Compra';
          },
           err => {
             this.router.navigate(['/order'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });
      }
    })
  }

  selectProvider(event: MatAutocompleteSelectedEvent): void {
    let provider = event.option.value as Provider;
    this.buyOrder.provider.id = provider.id;
    this.buyOrder.provider.name = provider.name;
    this.buyOrder.provider.code = provider.code;
    this.providerNameControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;

    if (this.existsItem(product.id)) {
      this.increaseQuantity(product.id);
    } else {
      let buyOrderItem = new BuyOrderItem();
      buyOrderItem.product = product;
      buyOrderItem.price = product.buyPrice;
      buyOrderItem.iva = this.iva.getIva(product.ivaType);
      buyOrderItem.ivaType = product.ivaType;
      this.buyOrder.items.push(buyOrderItem);
    }
    this.productControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  existsItem(id: number): boolean {
    let exists = false;
    this.buyOrder.items.forEach((item: BuyOrderItem) => {
      if (id === item.product.id) {
        exists = true;
      }
    });
    return exists;
  }

  increaseQuantity(id: number): void {
    this.buyOrder.items = this.buyOrder.items.map((item: BuyOrderItem) => {
      if (id === item.product.id) {
        ++item.quantity;
      }
      return item;
    });
  }

  updateQuantity(id: number, event: any): void {
    let quantity: number = event.target.value as number;

    if (quantity == 0) {
      return this.deleteBuyOrderItem(id);
    }

    this.buyOrder.items = this.buyOrder.items.map((item: BuyOrderItem) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }
      return item;
    });
  }

  updateDiscount(id: number, event: any): void {
    let discount: number = event.target.value as number;
    this.buyOrder.items = this.buyOrder.items.map((item: BuyOrderItem) => {
      if (id === item.product.id) {
        item.discount = discount;
      }
      return item;
    });
  }

  updatePrice(id: number, event: any): void {
    let price: number = event.target.value as number;
    this.buyOrder.items = this.buyOrder.items.map((item: BuyOrderItem) => {
      if (id === item.product.id) {
        item.price = price;
      }
      return item;
    });
  }

  deleteBuyOrderItem(id: number): void {
    this.buyOrder.items = this.buyOrder.items.filter((item: BuyOrderItem) => id !== item.product.id);
  }

  create(): void{
    this.buyOrderService.create(this.buyOrder)
    .subscribe( response => {
      console.log(response.buyOrder);
      this.buyOrder.number = response.buyOrder.number;
      this.buyOrder.id = response.buyOrder.id;
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
    this.buyOrderService.update(this.buyOrder)
    .subscribe ( order => {
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

  new():void{
      this.buyOrder = new BuyOrder();
      this.buyOrder.provider = new Provider();
  }





}
