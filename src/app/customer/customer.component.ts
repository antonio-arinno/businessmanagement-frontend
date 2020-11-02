import { Component, OnInit} from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import Swal from 'sweetalert2';
import { AuthService } from '../user/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  paginator: any;
  component= '/customer';

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.customerService.getCustomers(page).subscribe(
        response => {
          this.customers = response.content as Customer[];
          this.paginator = response;
        });
      }
    );
  }

  delete(customer: Customer): void {
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
        this.customerService.delete(customer.id).subscribe(
          response => {
            this.customers = this.customers.filter(cus => cus !== customer)
            Swal.fire(response.title, response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }

/*
  delete(customer: Customer): void {
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
        this.customerService.delete(customer.id).subscribe(
          response => {
            this.customers = this.customers.filter(cus => cus !== customer)
            Swal.fire(
              'Deleted!',
              'Customer has been deleted.',
              'success'
            )
        }
      )
      }
    })
  }
*/
}
