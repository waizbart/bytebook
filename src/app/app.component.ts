import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'bytebook_v2';

  showSidebar: boolean = false;

  publicRoutes = [
    'login',
    'register'
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !this.publicRoutes.includes(event.url.split('/')[1]);
      }
    });
  }
}
