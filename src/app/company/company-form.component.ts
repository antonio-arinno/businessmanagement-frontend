import { Component, OnInit } from '@angular/core';
import { Company } from './company';
import { CompanyService } from './company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {


  public company: Company = new Company();
  public titulo: string = "Create Company";

  public errores: string[];

  constructor(private companyService: CompanyService,) { }

  ngOnInit(): void {
    this.loadCompany();
  }



  loadCompany(): void{
    this.companyService.getCompany()
      .subscribe((company) => this.company = company,
      err => {
        Swal.fire(err.error.error, err.error.message, 'error');
      }
    );
  }








}
