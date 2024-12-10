import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import LoginComponent
import { AuthGuard } from './auth.gaurd';
import { HomeComponent } from './home.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent), // Lazy load HomeComponent
    canActivate: [AuthGuard], // Protect this route with the Auth Guard
  },
  {
    path: 'login',
    component: LoginComponent, // Route for LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login', // Redirect unknown paths to the home route
  },
];
