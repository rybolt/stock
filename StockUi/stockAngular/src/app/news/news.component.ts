import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';
import { Article } from './news.model';
import { NewsQuery } from './news-query.model';

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

  fetchNews(): void {
    const query: NewsQuery = {
      q: 'Apple',                   // Example search term
      from: '2024-12-01',           // Example date
      sortBy: 'popularity',
      apiKey: 'c7163748ac2644deacb54473fb2741fb', // todo: get this in auth process on the User object
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
