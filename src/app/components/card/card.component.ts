import { BookService } from './../../services/book/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [],
})
export class CardComponent implements OnInit {
  @Input() card: Card = {
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
