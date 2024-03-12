import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [
    
  ]
})
export class CardComponent implements OnInit{

  @Input() card: Card = {
    img: '',
    titulo: '',
    autor: '',
    nota: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
