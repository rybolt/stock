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
  testData:StockData[] = []
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    //this.loadStockData(this.ticker); 
  }

  ngAfterViewInit():void{
    setTimeout(()=> {
      this.testData =[
        {
            "date": "2024-12-06T00:00:00",
            "price": 243.53
        },
        {
            "date": "2024-12-05T00:00:00",
            "price": 243.04
        },
        {
            "date": "2024-12-04T00:00:00",
            "price": 243.01
        },
        {
            "date": "2024-12-03T00:00:00",
            "price": 242.65
        },
        {
            "date": "2024-12-02T00:00:00",
            "price": 239.59
        },
        {
            "date": "2024-11-29T00:00:00",
            "price": 237.33
        },
        {
            "date": "2024-11-27T00:00:00",
            "price": 234.93
        },
        {
            "date": "2024-11-26T00:00:00",
            "price": 235.06
        }
      ];
      this.createChart(this.testData );
    }, 0);
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
