import { CardComponent } from './../../components/card/card.component';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from '../../components/slider/slider.component';
import { QuoteComponent } from '../../components/quote/quote.component';
import { BookService } from '../../services/book/book.service';
import { Card } from '../../components/card/card';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent],
  providers: [HttpClientModule],
})
export class BookDetailsComponent {
  book: Card = {
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

  teste: any;

  lendoAtualmente: number = 0;

  lidoPor: number = 0;

  avaliability: boolean[] = [];

  constructor(private bookService: BookService, private toastr: ToastrService) {}

  ngOnInit(): void {
    let info = this.bookService.getSelectedBookInfo();
    if (info.title !== '') {
      this.book = info;
    }

    this.setValues();

    this.generateRandomBooleans(3);
  }

  randomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setValues() {
    this.lendoAtualmente = this.randomNumber(1, 10000);

    this.lidoPor = this.randomNumber(
      this.lendoAtualmente,
      this.lendoAtualmente + 10000
    );
  }

  generateRandomBooleans(num: number) {
    for (let i = 0; i < num; i++) {
      let rand = Math.random();
      let arredondado = Math.round(rand);
      this.avaliability.push(arredondado === 1);
    }
  }

  saveBook(book: any) {
    this.bookService.saveBook(book).subscribe(() => {
      this.toastr.success('Livro salvo com sucesso!');
    }, error => {
      console.error('Erro ao salvar livro:', error);
      this.toastr.error(error.error.message, 'Erro ao salvar livro');
    });
  }
}
