export interface NewsQuery {
    q?: string;             // Search keyword
    from?: string;          // Start date for articles
    to?: string;            // End date for articles
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt'; // Sorting preference
    apiKey: string;         // API Key
    country: string;
  }
  