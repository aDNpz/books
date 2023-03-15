import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBook } from "../model";

@Injectable({
  providedIn: "root"
})
export class BookService {
  private readonly url = 'http://localhost:3000/books'

  constructor(private httpClient : HttpClient) {

  }

  getAllBooks() {
    return this.httpClient.get<IBook[]>(this.url);
  }

  getBookById(id:number){
    return this.httpClient.get<IBook>(this.url+'/'+id);
  }

  updateBook(updateBook: IBook){
    return this.httpClient.put(this.url+'/'+updateBook.id, updateBook);
  }

  deleteBook(id:number){
    return this.httpClient.delete(this.url+'/'+id);
  }

  addBook(book : IBook) {
    this.httpClient.post<IBook>(this.url, book)
  }
}
