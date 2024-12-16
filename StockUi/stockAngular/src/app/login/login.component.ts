import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'; // A service to handle authentication logic
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
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
