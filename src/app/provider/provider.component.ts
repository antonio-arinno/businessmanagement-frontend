import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../services/provider.service';
import { Provider } from '../model/provider';
import { AuthService } from '../user/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html'
})
export class ProviderComponent implements OnInit {

  providers: Provider[];
  paginator: any;
  component= '/provider';

  constructor(private providerService: ProviderService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.providerService.getProviders(page).subscribe(
        response => {
          this.providers = response.content as Provider[];
          this.paginator = response;
        });
      }
    );
  }

  delete(provider: Provider): void {
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
        this.providerService.delete(provider.id).subscribe(
          response => {
            this.providers = this.providers.filter(pro => pro !== provider)
            Swal.fire(response.title , response.message,  'success');
        },err => {
          Swal.fire(err.error.error, err.error.message, 'error')
        }
      )
      }
    })
  }






















}
