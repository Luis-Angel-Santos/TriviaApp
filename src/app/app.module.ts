import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TriviaComponent } from './trivia/trivia/trivia.component';
import { HomeComponent } from './trivia/home/home.component';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TriviaPipe } from './trivia/trivia.pipe';

@NgModule({
  declarations: [
    TriviaComponent,
    HomeComponent,
    AppComponent,
    TriviaPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
