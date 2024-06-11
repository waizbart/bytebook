import {
  Book as GoogleBook
} from './book.interface';

export interface Book {
  id: string;
  google_books_id: string;
  userId: string;
  tag: string;
  google_book: GoogleBook
}
