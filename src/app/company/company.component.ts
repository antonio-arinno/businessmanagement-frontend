import { Company } from '../model/company';
import { CompanyService } from '../services/company.service';
import Swal from 'sweetalert2';
import { AuthService } from '../user/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  public company: Company = new Company();
  public titulo: string = "Company";
  public errores: string[];

  constructor(private companyService: CompanyService,
              public authService: AuthService) { }

  ngOnInit(): void {
      this.companyService.getCompany()
        .subscribe((company) => this.company = company,
        err => {
          Swal.fire(err.error.error, err.error.message, 'error');
        }
      );
  }

  update():void{
    this.companyService.update(this.company)
    .subscribe ( company => {
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
