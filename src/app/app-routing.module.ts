import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books'},
  { path: 'books', component: BooksComponent },
  { path: 'books-add', component: BookDetailsComponent },
  { path: 'books/:id', component: BookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
