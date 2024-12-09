import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import {AuthInterceptor } from './auth.interceptor'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NewsComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true, // Ensures multiple interceptors can be used
  //   }
  // ]
})
export class AppComponent {
  title = 'stockAngular';
}
