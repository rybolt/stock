import { Component } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent,StockChartComponent],
  template: `
    <h3 class="p-3">
    Welcome
      <small class="text-muted">{{username}}</small>
    </h3>
    <div><app-stock-chart></app-stock-chart></div>
    <div><app-news></app-news></div>
  `,
})
export class HomeComponent {

  username : string | null = "";

  constructor(private authSvc : AuthService){
    this.username = authSvc.getCredentials().username;
  }
}
