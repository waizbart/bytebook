import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Card } from '../card/card';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CardComponent,
    CommonModule
  ],
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carouselElement: ElementRef<HTMLElement> | null = null;
  isDragStart: boolean = false;
  prevPageX: number = 0;
  prevScrollleft: number = 0;
  positionDiff: number = 0;

  constructor() { }

  listaCards: Array<Card> = [
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 1',
      autor: 'Geroge',
      nota: '4.3/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 2',
      autor: 'Ave',
      nota: '4.2/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 3',
      autor: 'Geronimo',
      nota: '4.1/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 4',
      autor: 'Baboza',
      nota: '4.9/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 5',
      autor: 'Jao',
      nota: '4.8/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 6',
      autor: 'Renato',
      nota: '4.4/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 7',
      autor: 'Geroge orwell',
      nota: '4.6/10'
    },
    {
      img: '/assets/images/logo.png',
      titulo: 'Livro 8',
      autor: 'Ronaldinho',
      nota: '4.7/10'
    }

  ];

  dragStart = (e: MouseEvent) => {
    const carousel = this.carouselElement!.nativeElement;
    if (carousel) {
      this.isDragStart = true;
      this.prevPageX = e.pageX;
      this.prevScrollleft = carousel.scrollLeft;
    }

  }

  touchStart = (e: TouchEvent) => {
    const carousel = this.carouselElement!.nativeElement;
    if (carousel) {
      this.isDragStart = true;
      this.prevPageX = e.touches[0].pageX;
      this.prevScrollleft = carousel.scrollLeft;
    }

  }

  dragStop = () => {
    this.isDragStart = false;
  }

  dragging = (e: MouseEvent) => {
    const carousel = this.carouselElement!.nativeElement;
    if (carousel) {
      if (!this.isDragStart) return;
      e.preventDefault();
      this.positionDiff = e.pageX - this.prevPageX;
      carousel.scrollLeft = this.prevScrollleft - this.positionDiff;
    } else {
      console.error('Carousel element not found dragStart.')
    }

  }

  touchdragging = (e: TouchEvent) => {
    const carousel = this.carouselElement!.nativeElement;
    if (carousel) {
      if (!this.isDragStart) return;
      e.preventDefault();
      this.positionDiff = e.touches[0].pageX - this.prevPageX;
      carousel.scrollLeft = this.prevScrollleft - this.positionDiff;
    } else {
      console.error('Carousel element not found dragStart.')
    }

  }

  ngOnInit(): void {
    if (this.carouselElement) {
      this.carouselElement.nativeElement.addEventListener('mousedown', this.dragStart);
      this.carouselElement.nativeElement.addEventListener('mousemove', this.dragging);
      this.carouselElement.nativeElement.addEventListener('mouseup', this.dragStop);

      this.carouselElement.nativeElement.addEventListener('touchstart', this.touchStart);
      this.carouselElement.nativeElement.addEventListener('touchmove', this.touchdragging);
      this.carouselElement.nativeElement.addEventListener('touchend', this.dragStop);
    } else {
      console.error('Carousel element not found.')
    }

  }


}
