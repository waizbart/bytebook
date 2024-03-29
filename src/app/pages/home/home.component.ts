import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../services/book.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { cutString } from '../../helpers/string';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    SliderComponent
  ],
  providers: [
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  search: string = '';
  title = 'Home';
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  onSearch() {
    this.getBooks(this.search);
  }

  getBooks(search?: string) {
    this.bookService.getBooks(search, 8).subscribe((data: any) => {
      this.books = data.items.map((item: any) => {
        return {
          title: cutString(item.volumeInfo.title, 15),
          authors: item.volumeInfo.authors,
          pageCount: item.volumeInfo.pageCount,
          publisher: item.volumeInfo.publisher,
          publishedDate: item.volumeInfo.publishedDate,
          previewLink: item.volumeInfo.previewLink,
          imageLinks: item.volumeInfo.imageLinks ?? {
            thumbnail: '/assets/images/home/no-image.webp',
          }
        };
      })
      .filter((book: Book) => book.authors !== undefined);
    });

    console.log(this.books);
  }
}
