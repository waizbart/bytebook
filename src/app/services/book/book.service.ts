import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://books.googleapis.com/books/v1/volumes';
  private fields = 'items/volumeInfo(authors,imageLinks,pageCount,publisher,publishedDate,previewLink,title)';

  constructor(private http: HttpClient) { }

  getBooks(q?: string, maxResults?: number) {
    let url = `${this.baseUrl}?fields=${this.fields}&q=${q || 'all'}`;

    if (maxResults) {
      url += `&maxResults=${maxResults}`;
    } else {
      url += '&maxResults=3';
    }

    return this.http.get<Book[]>(url);
  }
}
