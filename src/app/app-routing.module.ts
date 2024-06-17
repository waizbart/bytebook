import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TelaLoginComponent } from "./pages/login/tela-login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { MyShelfComponent } from './pages/my-shelf/my-shelf.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: TelaLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my-shelf', component: MyShelfComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
