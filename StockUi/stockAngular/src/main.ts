import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; 

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    //provideRouter(appRoutes),
    provideHttpClient(),  // <-- Add this to provide the HttpClient
  ],
}).catch((err) => console.error(err));
