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
    console.log('constructor header');
  }


  logout():void{
    let username = this.authService.user.username;
    this.authService.logout();
    Swal.fire('Logout',`Hola ${username}, has cerrado sesión!`,'success');
    this.router.navigate(['/login']);
  }
}
