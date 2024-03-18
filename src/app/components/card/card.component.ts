import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';

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

  constructor() {}

  ngOnInit(): void {}
}
