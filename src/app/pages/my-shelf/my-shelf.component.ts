import { Component } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-shelf',
  templateUrl: './my-shelf.component.html',
  styleUrl: './my-shelf.component.css'
})
export class MyShelfComponent {
  constructor(private bookService: BookService, private toastr: ToastrService) { }

  books: any[] = [];

  ngOnInit() {
    this.getMyBooks();
  }

  getMyBooks() {
    this.bookService.getMyGoogleBooks().subscribe((data: any) => {
      this.books = data
    });
  }

  removeBook(id: string) {
    this.bookService.removeBook(id).subscribe(() => {
      this.toastr.success('Livro removido com sucesso!');
      this.getMyBooks();
    }, error => {
      console.error('Erro ao remover livro:', error);
      this.toastr.error('Erro ao remover livro!');
    });
  }
}
