import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidator } from 'src/form-validator';
import { IBook, IBookGenre } from '../model';
import { BookGenreService } from '../Service/book-genre.service';
import { BookService } from '../Service/books.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  detailModel?: IBook;
  id : number = 0;
  genreList: IBookGenre[] = [];

  detailForm: FormGroup = new FormGroup({'default': new FormControl()});

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private bookService: BookService, private genreService: BookGenreService, private formBuilder : FormBuilder) {

    }



  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.initForm();
    this.getGenres();
    this.getBookById();
  }


  initForm() {
    this.detailForm = this.formBuilder.group({
      id: [0],
      title: ['',[Validators.required]],
      isbn: ['',[Validators.required]],
      author: ['',[Validators.maxLength(256)]],
      preview: ['',[FormValidator.checkPreview]],
      genre: ['']
    });
  }
  getGenres() {
    this.genreService.getAllGenres().subscribe(data => this.genreList = data)
  }
  getBookById() {
    this.bookService.getBookById(this.id).subscribe({
      next: data => {
        this.detailModel = data;
        this.detailForm.patchValue(data);
      },
      error: err => console.log(err),
      complete: () => console.log('finished getById', this.detailModel)
    });
  }

  onSubmit() {
    this.bookService.updateBook(this.detailForm.value).subscribe(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['books']);
  }

}
