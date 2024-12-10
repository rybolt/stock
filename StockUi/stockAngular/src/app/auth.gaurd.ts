import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { console.log("authguard initliazed..."); }

  canActivate(): boolean {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    if (username && password) {
      // Allow navigation if credentials are present
      return true;
    }

    // Redirect to login if not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
