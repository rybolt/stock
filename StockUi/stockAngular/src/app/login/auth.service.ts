import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string | null = null;
  private password: string | null = null;

  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;

    // You can also store the credentials in localStorage or sessionStorage for persistence
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
  }

  getCredentials(): { username: string | null, password: string | null } {
    return {
      username: this.username ?? sessionStorage.getItem('username'),
      password: this.password ?? sessionStorage.getItem('password')
    };
  }
}
