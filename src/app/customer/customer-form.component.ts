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
        this.customerService.getCustomer(id)
          .subscribe((customer) => {
            this.customer = customer
            },
           err => {
             this.router.navigate(['/customer'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });

      }
    })
  }

  create(): void{
    this.customerService.create(this.customer)
    .subscribe( response => {
      this.router.navigate(['/customer'])
      Swal.fire(response.title, response.message, 'success');
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
    .subscribe ( response => {
      this.router.navigate(['/customer'])
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
