import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.interface';
import { Observable, Subject } from 'rxjs';
import { Card } from '../../components/card/card';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'https://books.googleapis.com/books/v1/volumes';
  private fields =
    'items/volumeInfo(authors,imageLinks,pageCount,publisher,publishedDate,previewLink,title,description, mainCategory, pageCount, averageRating, language)';
  private bookInfo: Card = {
    title: '',
    authors: [],
    pageCount: 0,
    publisher: '',
    publishedDate: '',
    previewLink: '',
    imageLinks: {
      smallThumbnail: '',
      thumbnail: '',
    },
    description: '',
    language: '',
    mainCategory: '',
    averageRating: 0,
  };

  constructor(private http: HttpClient) {}

  getBooks(q?: string, maxResults?: number) {
    let url = `${this.baseUrl}?fields=${this.fields}&q=${q || 'all'}`;

    if (maxResults) {
      url += `&maxResults=${maxResults}`;
    } else {
      url += '&maxResults=3';
    }

    return this.http.get<Book[]>(url);
  }

  setSelectedBookinfo(bookInfo: Card) {
    this.bookInfo = bookInfo;
  }

  getSelectedBookInfo() {
    return this.bookInfo;
  }
}
