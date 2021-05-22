import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Usuario no encontrado',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(error);
    }
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user && user.emailVerified) {
        this.checkUserIsVerified(user);
        this.router.navigate(['/home']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sesión Iniciada Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sesión Iniciada Correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    } else if (user) {
      this.router.navigate(['/verification-email']);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Usuario no encontrado',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.router.navigate(['/register']);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salió mal, intenta nuevamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
