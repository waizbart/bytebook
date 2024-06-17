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
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    HeaderComponent,
  ],
  providers: [HttpClientModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
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
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        this.searchBooks(this.searchQuery);
      }
    });
  }

  onSearch() {
    if (this.search.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.search } });
    }
  }

  navigateToDetails(book: any): void {
    this.bookService.setSelectedBookinfo(book);
    this.router.navigate(['/book-details']);
  }

  searchBooks(query: string) {
    this.isLoading = true;
    this.bookService.getBooks(query).subscribe((data: any) => {
      this.books = data.items.map((item: any) => ({
        ...item.volumeInfo,
        id: item.id,
        isFavorite: this.isBookFavorite(item.id),
        physicalAvailable: this.randomBoolean(),
        digitalAvailable: true,
        audioAvailable: this.randomBoolean()
      }));
      this.isLoading = false;
    });
  }

  isBookFavorite(bookId: string): boolean {
    // Implementar lógica para verificar se o livro está nos favoritos
    return false;
  }

  toggleFavorite(book: any) {
    if (book.isFavorite) {
      book.isFavorite = false;
      this.toastr.success('Livro removido dos favoritos!');
    } else {
      book.isFavorite = true;
      this.toastr.success('Livro adicionado aos favoritos!');
    }
  }

  randomBoolean() {
    return Math.random() >= 0.5;
  }
}
