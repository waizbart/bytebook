import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';
import { Router } from '@angular/router';

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
  };

  constructor(private router: Router) { }

  ngOnInit(): void {}

  navigateToDetails(): void {
    this.router.navigate(['/book-details'], {
      queryParams: {
        previewLink: this.card.previewLink,
        title: this.card.title,
        authors: this.card.authors.join(', ') // Convertendo a array de autores para string
      }
    });
  }
}
