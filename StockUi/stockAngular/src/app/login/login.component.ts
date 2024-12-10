import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'; // A service to handle authentication logic
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onLogin()" #loginForm="ngForm">
      <label for="username">Username</label>
      <input type="text" id="username" [(ngModel)]="username" name="username" required />

      <label for="password">Password</label>
      <input type="password" id="password" [(ngModel)]="password" name="password" required />

      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor() { console.log('ctor Login comp. called...'); }
  
  // Use inject() to get the AuthService instance
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    this.authService.setCredentials(this.username, this.password);
    this.router.navigate(['/']); //go home
  }
}
