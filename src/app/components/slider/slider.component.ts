import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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

  @Input() cards: Array<any> = [];
  @Input() onClick: Function = () => { };

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
