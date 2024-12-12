import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './app/auth.interceptor';
import { AuthService } from './app/login/auth.service';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),  // <-- Add this to provide the HttpClient
    AuthService
  ],
}).catch((err) => console.error(err));
