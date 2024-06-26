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
    id: '',
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

  async verifyFavorite(id: string): Promise<boolean | null> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const response = await this.http
      .get<{ results: boolean }>(`${this.baseUrl}/${id}`, {
        headers,
      })
      .toPromise();

    console.log(response);

    const result = response?.hasOwnProperty('results')
      ? response['results']
      : null;
    return result;
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

    console.log(id);

    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  saveBook(book: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      this.baseUrl,
      {
        google_books_id: book.id,
        userId: userId,
        tag: 'Minha lista',
      },
      { headers }
    );
  }

  setSelectedBookinfo(bookInfo: Card) {
    this.bookInfo = bookInfo;
  }

  getSelectedBookInfo() {
    return this.bookInfo;
  }
}
