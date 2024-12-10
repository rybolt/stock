import { Component } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent],
  template: `
    <h1>Welcome {{ username }} </h1>
    <div><app-news></app-news></div>
  `,
})
export class HomeComponent {

  username : string | null = "";

  constructor(private authSvc : AuthService){
    this.username = authSvc.getCredentials().username;
  }
}
