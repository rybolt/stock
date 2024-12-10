import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //make service global
})
export class AuthService {
  private username: string | null = null;
  private password: string | null = null;

  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;

    if (typeof sessionStorage === 'undefined') {
      console.error('SessionStorage is not supported in this environment.');
    } else {
      console.log('SessionStorage is supported.');
    }
    
    //  sessionStorage for persistence
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);

    console.log('set credentials in session storage: ', {username, password});
  }

  getCredentials(): { username: string | null, password: string | null } {
    return {
      username: this.username ?? sessionStorage.getItem('username'),
      password: this.password ?? sessionStorage.getItem('password')
    };
  }

  clearCredentials(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }
}
