import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StockData,StockService } from '../stockapi/stock.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {

  //todo: rid hard-coding
  ticker:string = 'AAPL';
  company:string = 'Apple'

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStockData(this.ticker); 
  }

  loadStockData(ticker: string): void {
    this.stockService.getStockData(ticker).subscribe((data: StockData[]) => {
      this.createChart(data);
    });
  }

  createChart(data: StockData[]): void {
    // Register all necessary components
    Chart.register(...registerables);

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map( d => new Date(d.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Stock Price',
            data: data.map(d => d.price),
            borderColor: 'rgb(23, 204, 228)',
            borderWidth: 1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Price'
            }
          }
        }
      }
    });
  }
}
