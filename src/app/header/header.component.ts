import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  title: string = 'App Angular'

  constructor(public authService: AuthService, private router: Router){


  }


  logout():void{
    let name = this.authService.user.name;
    this.authService.logout();
    Swal.fire('Logout',`Hasta pronto ${name}, has cerrado sesión!`,'success');
    this.router.navigate(['/login']);
  }
}
