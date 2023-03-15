import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBookGenre } from "../model";

@Injectable({
  providedIn: "root"
})
export class BookGenreService {
  private readonly url = 'http://localhost:3000/bookgenre'


  constructor(private httpClient: HttpClient) {

  }

  getAllGenres(){
    return this.httpClient.get<IBookGenre[]>(this.url);
  }

}
