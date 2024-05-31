import { Component, Input, OnInit } from '@angular/core';
import { CardNewArrivals } from './card';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-card-new-arrivals',
  templateUrl: './card-new-arrivals.component.html',
  styleUrl: './card-new-arrivals.component.css',
  imports: []
})
export class CardNewArrivalsComponent implements OnInit {
  @Input() card: CardNewArrivals = {
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
      }
    });
  }
}
