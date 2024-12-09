import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'; // A service to handle authentication logic

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

  // Use inject() to get the AuthService instance
  private authService = Inject(AuthService);

  onLogin() {
    this.authService.setCredentials(this.username, this.password);
  }
}
