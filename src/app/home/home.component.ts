import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  search: string = '';

  title = 'Home';

  constructor() {}

  onSearch() {
    console.log('Search: ', this.search);
  }
}
