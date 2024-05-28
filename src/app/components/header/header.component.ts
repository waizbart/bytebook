import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  search: string = '';
  currentTime: string = '';
  currentDate: string = '';
  private timer: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateDateTime();
    this.timer = setInterval(() => this.updateDateTime(), 1000); // Atualiza a cada segundo
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateDateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    this.currentDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  onLanguageChange(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    if (selectedLanguage === 'en') {
      this.router.navigate(['/english-page']); // Substitua '/english-page' pela rota da página em inglês
    } else if (selectedLanguage === 'pt') {
      this.router.navigate(['/']); // Substitua '/' pela rota da página em português
    }
  }
}
