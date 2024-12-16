import { Component } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { AuthService } from './login/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent,StockChartComponent,CommonModule],
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username : string | null = "";
  dropdownOpen: boolean = false; 

  constructor(private authSvc : AuthService){
    this.username = authSvc.getCredentials().username;
  }
  
  toggleDropdown() { this.dropdownOpen = !this.dropdownOpen; 
  } 
  setTicker() { // Logic to set ticker 
    } 
  logout() { // Logic to logout
     }
}
