import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book/book.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-shelf',
  standalone: true,
  templateUrl: './my-shelf.component.html',
  styleUrl: './my-shelf.component.css',
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    HeaderComponent,
  ],
})
export class MyShelfComponent {
  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  books: any[] = [];

  search: string = ''

  ngOnInit() {
    this.getMyBooks();
  }

  onSearch() {
    if (this.search.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.search } });
    }
  }

  getMyBooks() {
    this.bookService.getMyGoogleBooks().subscribe((data: any) => {
      this.books = data;
    });
  }

  removeBook(id: string) {
    this.bookService.removeBook(id).subscribe(
      () => {
        this.toastr.success('Livro removido com sucesso!');
        this.books = this.books.filter((book) => book.id !== id);
      },
      (error) => {
        console.error('Erro ao remover livro:', error);
        this.toastr.error('Erro ao remover livro!');
      }
    );
  }

  openNewPage(link: string) {
    window.open(link, '_blank');
  }
}
