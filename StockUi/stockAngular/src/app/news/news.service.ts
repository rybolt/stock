import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsApiResponse } from './news.model';
import { NewsQuery } from './news-query.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = 'https://newsapi.org/v2/everything'; // Base API endpoint, this can change and need to add logic to make more dynamic. for now just testing the api

  constructor(private http: HttpClient) {}

  getNews(query: NewsQuery): Observable<NewsApiResponse> {
    let params = new HttpParams();

    // Append query parameters dynamically
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value.toString());
      }
    });

    return this.http.get<NewsApiResponse>(this.baseUrl, { params });
  }
}
