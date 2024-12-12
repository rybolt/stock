import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';
import { Article } from './news.model';
import { NewsQuery } from './news-query.model';
import { API_CONFIG } from './config';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  newsArticles: Article[] = [];
  loading = true;
  error = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  // ngOnInit(): void {
  //   this.newsArticles = [
  //     {
  //       source: { id: '1', name: 'Test Source 1' },
  //       author: 'Author 1',
  //       title: 'Test Article 1',
  //       description: 'This is a description for Test Article 1.',
  //       url: 'https://example.com/article1',
  //       urlToImage: 'https://via.placeholder.com/150',
  //       publishedAt: '2024-12-11T12:00:00Z',
  //       content: 'Content for Test Article 1.',
  //     },
  //     {
  //       source: { id: '2', name: 'Test Source 2' },
  //       author: 'Author 2',
  //       title: 'Test Article 2',
  //       description: 'This is a description for Test Article 2.',
  //       url: 'https://example.com/article2',
  //       urlToImage: 'https://via.placeholder.com/150',
  //       publishedAt: '2024-12-10T12:00:00Z',
  //       content: 'Content for Test Article 2.',
  //     },
  //     {
  //       source: { id: '3', name: 'Test Source 3' },
  //       author: 'Author 3',
  //       title: 'Test Article 3',
  //       description: 'This is a description for Test Article 3.',
  //       url: 'https://example.com/article3',
  //       urlToImage: 'https://via.placeholder.com/150',
  //       publishedAt: '2024-12-09T12:00:00Z',
  //       content: 'Content for Test Article 3.',
  //     },
  //     {
  //       source: { id: '4', name: 'Test Source 4' },
  //       author: 'Author 4',
  //       title: 'Test Article 4',
  //       description: 'This is a description for Test Article 4.',
  //       url: 'https://example.com/article4',
  //       urlToImage: 'https://via.placeholder.com/150',
  //       publishedAt: '2024-12-08T12:00:00Z',
  //       content: 'Content for Test Article 4.',
  //     },
  //     {
  //       source: { id: '5', name: 'Test Source 5' },
  //       author: 'Author 5',
  //       title: 'Test Article 5',
  //       description: 'This is a description for Test Article 5.',
  //       url: 'https://example.com/article5',
  //       urlToImage: 'https://via.placeholder.com/150',
  //       publishedAt: '2024-12-07T12:00:00Z',
  //       content: 'Content for Test Article 5.',
  //     },
  //   ];

  //   // Set loading to false since this is test data
  //   this.loading = false;
  // }
  
  //todo: data logic prob. needs go in a util type class
  currentDate = new Date();
  startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

  formatDate  = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`
  };

  groupArticles<T>(items: T[], groupSize: number): T[][] {
    if (!items || items.length === 0) return []; // Return empty array for safety
    const groups: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  }
  
  
  fetchNews(): void {
    const query: NewsQuery = {
      q: 'Apple',                   // Example search term
      from: this.formatDate(this.startOfMonth),           // Example date
      sortBy: 'popularity',
      apiKey: API_CONFIG.apiKey, 
    };

    this.newsService.getNews(query).subscribe(
      (data) => {
        this.newsArticles = data.articles.filter( article =>
          article.source && article.source.name !== '[Removed]' && article.source.id !== null
        );
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching news:', err);
        this.error = true;
        this.loading = false;
      }
    );
  }
}
