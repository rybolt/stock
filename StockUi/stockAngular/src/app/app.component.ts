import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet} from '@angular/router';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import {AuthInterceptor } from './auth.interceptor'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  //templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: '<router-outlet></router-outlet>'
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true, // Ensures multiple interceptors can be used
  //   }
  // ]
})
export class AppComponent {
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });
  }
  
}
