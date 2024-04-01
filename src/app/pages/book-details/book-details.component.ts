import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../services/book.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  previewLink: string = '';
  title: string = '';
  authors: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.title = params.title;
      this.authors = params.authors;
      this.previewLink = params.previewLink.replace('http', 'https');
    })
  }
}
