import { CardComponent } from './../../components/card/card.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from '../../components/slider/slider.component';
import { QuoteComponent } from '../../components/quote/quote.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  imports: [FormsModule, CommonModule, HeaderComponent],
  providers: [HttpClientModule],
})
export class BookDetailsComponent {
  previewLink: string = '';
  title: string = '';
  authors: string[] = [];
  thumb = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.title = params.title;
      this.authors = params.authors;
      this.previewLink = params.previewLink.replace('http', 'https');
      this.thumb = params.thumb;
    });
  }
}
