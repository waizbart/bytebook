import { Component } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, HeaderComponent],
  providers: [HttpClientModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery: string = '';
  books: any[] = [];
  isLoading: boolean = false;
  search: string = '';
  avaliability: boolean[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        this.searchBooks(this.searchQuery);
      }
    });
  }

  onSearch() {
    if (this.search.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.search },
      });
    }
  }

  navigateToDetails(book: any): void {
    this.bookService.setSelectedBookinfo(book);
    this.router.navigate(['/book-details']);
  }

  searchBooks(query: string) {
    this.isLoading = true;
    this.bookService.getBooks(query, 20).subscribe((data: any) => {
      const bookPromises = data.items.map(async (item: any) => ({
        ...item.volumeInfo,
        id: item.id,
        favorite: await this.isBookFavorite(item.id),
        physicalAvailable: this.randomBoolean(),
        digitalAvailable: true,
        audioAvailable: this.randomBoolean(),
      }));
      Promise.all(bookPromises).then((books) => {
        this.books = books;
        this.isLoading = false;
      });
    });
  }

  async isBookFavorite(id: string) {
    return await this.bookService.verifyFavorite(id);
  }

  toggleFavorite(book: any, index: number) {
    if (this.books[index].favorite) {
      this.bookService.removeBook(this.books[index].id).subscribe(
        () => {
          this.toastr.success('Livro removido com sucesso!');
        },
        (error) => {
          console.error('Erro ao remover livro:', error);
          this.toastr.error(error.error.message, 'Erro ao remover livro');
        }
      );
      this.books[index].favorite = false;
    } else {
      this.bookService.saveBook(book).subscribe(
        () => {
          this.toastr.success('Livro salvo com sucesso!');
        },
        (error) => {
          console.error('Erro ao salvar livro:', error);
          this.toastr.error(error.error.message, 'Erro ao salvar livro');
        }
      );
      this.books[index].favorite = true;
    }
  }

  randomBoolean() {
    return Math.random() >= 0.5;
  }
}
