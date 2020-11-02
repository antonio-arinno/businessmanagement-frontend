import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { Address } from '../model/address';
import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})

export class CustomerFormComponent implements OnInit {

  public customer: Customer = new Customer();

  public address: Address = new Address();

  public titulo: string = "Customer";

  public errores: string[];

  constructor(private customerService: CustomerService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.customer.address = this.address;
    this.loadCustomer();
  }

  loadCustomer(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
//        this.customerService.getCustomer(id).subscribe((customer) => this.customer = customer);
        this.customerService.getCustomer(id)
          .subscribe((customer) => this.customer = customer,
           err => {
             this.router.navigate(['/customer'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });

      }
    })
  }

  create(): void{
    console.log('kkklkl');
    console.log(this.customer);
    this.customerService.create(this.customer)
    .subscribe( customer => {
      this.router.navigate(['/customer'])
      Swal.fire(  'Nuevo cliente',  'Cliente creado con exito',  'success');
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
    this.customerService.update(this.customer)
    .subscribe ( customer => {
      this.router.navigate(['/customer'])
      Swal.fire('Cliente Actualizado', 'Cliente actualizado con exito', 'success')
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
