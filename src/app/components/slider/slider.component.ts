import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  standalone: true,
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [CommonModule, CardComponent]
})
export class SliderComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carouselElement: ElementRef<HTMLElement> | null = null;
  isDragStart: boolean = false;
  prevPageX: number = 0;
  prevScrollLeft: number = 0;
  positionDiff: number = 0;

  @Input() cards: Array<any> = [];
  @Input() isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (this.carouselElement) {
      const carousel = this.carouselElement.nativeElement;

      // Event listeners for dragging
      carousel.addEventListener('mousedown', this.dragStart.bind(this));
      carousel.addEventListener('mousemove', this.dragging.bind(this));
      carousel.addEventListener('mouseup', this.dragStop.bind(this));
      carousel.addEventListener('mouseleave', this.dragStop.bind(this));

      // Event listeners for touch events
      carousel.addEventListener('touchstart', this.touchStart.bind(this));
      carousel.addEventListener('touchmove', this.touchDragging.bind(this));
      carousel.addEventListener('touchend', this.dragStop.bind(this));
    } else {
      console.error('Carousel element not found.');
    }
  }

  dragStart(e: MouseEvent): void {
    this.isDragStart = true;
    this.prevPageX = e.pageX;
    this.prevScrollLeft = this.carouselElement!.nativeElement.scrollLeft;
  }

  touchStart(e: TouchEvent): void {
    this.isDragStart = true;
    this.prevPageX = e.touches[0].pageX;
    this.prevScrollLeft = this.carouselElement!.nativeElement.scrollLeft;
  }

  dragStop(): void {
    this.isDragStart = false;
  }

  dragging(e: MouseEvent): void {
    if (!this.isDragStart) return;
    e.preventDefault();
    const positionDiff = e.pageX - this.prevPageX;
    this.carouselElement!.nativeElement.scrollLeft = this.prevScrollLeft - positionDiff;
  }

  touchDragging(e: TouchEvent): void {
    if (!this.isDragStart) return;
    e.preventDefault();
    const positionDiff = e.touches[0].pageX - this.prevPageX;
    this.carouselElement!.nativeElement.scrollLeft = this.prevScrollLeft - positionDiff;
  }
}
