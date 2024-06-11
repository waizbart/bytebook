import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book.interface';
import { Observable, Subject, forkJoin, map, switchMap } from 'rxjs';
import { Card } from '../../components/card/card';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private googleBaseUrl = 'https://books.googleapis.com/books/v1/volumes';
  private baseUrl = 'http://localhost:3333/books';

  constructor(private http: HttpClient) {}

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

  getBooks(q?: string, maxResults: number = 3): Observable<any> {
    const query = q ? `${q} programming` : 'programming';
    const url = `${this.googleBaseUrl}?q=${query}&maxResults=${maxResults}`;
    return this.http.get<any>(url);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.googleBaseUrl}/${id}`);
  }

  getMyBooks(): Observable<Book[]> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Book[]>(`${this.baseUrl}?userId=${userId}`, {
      headers,
    });
  }

  getMyGoogleBooks(): Observable<any[]> {
    return this.getMyBooks().pipe(
      switchMap((books: any) => {
        const booksResults = books.results;
        const bookObservables = booksResults.map((book: any) =>
          this.getBook(book.google_books_id).pipe(
            map((googleBook) => ({
              ...book,
              google_book: googleBook,
            }))
          )
        );
        return forkJoin(bookObservables);
      })
    ) as Observable<any[]>;
  }

  removeBook(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  setSelectedBookinfo(bookInfo: Card) {
    this.bookInfo = bookInfo;
  }

  getSelectedBookInfo() {
    return this.bookInfo;
  }
}
