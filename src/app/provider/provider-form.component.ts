import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Provider } from '../model/provider';
import { Address } from '../model/address';
import { ProviderService } from '../services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html'
})
export class ProviderFormComponent implements OnInit {

  public provider: Provider = new Provider();
  public address: Address = new Address();
  public titulo: string = "Provider";
  public errores: string[];

  constructor(private providerService: ProviderService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.provider.address = this.address;
    this.load();
  }

  load(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.providerService.getProvider(id)
          .subscribe((provider) => {
            this.provider = provider;
            console.log(this.provider);
            },
           err => {
             this.router.navigate(['/provider'])
             Swal.fire(err.error.error, err.error.message, 'error');
            });

      }
    })
  }

  create(): void{
    this.providerService.create(this.provider)
    .subscribe( provider => {
      this.router.navigate(['/provider'])
      Swal.fire(  'Nuevo provider',  'Provider creado con exito',  'success');
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
    this.providerService.update(this.provider)
    .subscribe ( provider => {
      this.router.navigate(['/provider'])
      Swal.fire('Proveedor Actualizado', 'Proveedor actualizado con exito', 'success')
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
