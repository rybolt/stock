import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockData {
  date: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:5051/api/Stock';

  constructor(private http: HttpClient) {}

  getStockData(ticker: string, from?: string, to?: string): Observable<StockData[]> {
    let params = new HttpParams();
    if (from) {
      params = params.set('from', from);
    }
    if (to) {
      params = params.set('to', to);
    }

    return this.http.get<StockData[]>(`${this.apiUrl}/${ticker}`, { params });
  }
}
