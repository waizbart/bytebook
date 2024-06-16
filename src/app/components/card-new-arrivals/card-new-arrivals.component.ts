import { Component, Input, OnInit } from '@angular/core';
import { CardNewArrivals } from './card';
import { Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
@Component({
  standalone: true,
  selector: 'app-card-new-arrivals',
  templateUrl: './card-new-arrivals.component.html',
  styleUrl: './card-new-arrivals.component.css',
  imports: [],
})
export class CardNewArrivalsComponent implements OnInit {
  @Input() card: CardNewArrivals = {
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

  constructor(private router: Router, private BookService: BookService) {}

  ngOnInit(): void {}

  navigateToDetails(): void {
    this.BookService.setSelectedBookinfo(this.card);

    this.router.navigate(['/book-details']);
  }
}
