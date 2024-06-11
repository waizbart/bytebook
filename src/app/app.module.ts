import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { CardNewArrivalsComponent } from './components/card-new-arrivals/card-new-arrivals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MyShelfComponent } from './pages/my-shelf/my-shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SidebarComponent,
    MyShelfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CardNewArrivalsComponent,
    BookDetailsComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
