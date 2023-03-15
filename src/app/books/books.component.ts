import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBook } from '../model';
import { BookService } from '../Service/books.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'isbn', 'author', 'preview', 'genre', 'delete'];

  booksTableSource: MatTableDataSource<IBook> = new MatTableDataSource();

  booksList: IBook[] = [];

  inputText: string = '';

  constructor(private router: Router,
            private bookService: BookService, ){

  }

  ngOnInit(): void {
    this.getAllBooks();
  }
  getAllBooks() {
    this.bookService.getAllBooks().subscribe(data => {
      this.booksList = data;
      this.booksTableSource.data = data;
    })
  }

  onDelete(id:number){
    this.bookService.deleteBook(id).subscribe(() => {
      this.getAllBooks();
    })
  }

  onInputChange(){
    let result = this.booksList.filter(x => x.title.includes(this.inputText));
    this.booksTableSource.data = result;
  }

}
