import { Component, OnInit } from '@angular/core';
import { Tutoria } from 'src/app/model/tutoria';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-tutoria.component.html',
  styleUrls: ['./add-tutoria.component.css']
})
export class AddTutoriaComponent implements OnInit {

  book = new Tutoria();
  submitted = false;
  msgError = '';
  isDisabled = true; 

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
  }

  existsPK (val:string): void {
    this.msgError  = '';
    this.isDisabled = true; 
    this.libraryService.get(val)
      .subscribe(
        data => {
          if (data!=null){
            this.msgError  = 'PK exists';
            this.isDisabled = true; 
          } else {
            this.isDisabled = false; 
          }
        },
        error => {
          this.msgError  = '';
          console.log(error);
        });
  }

  saveBook(): void {
    const data = {
      isbn: this.book.isbn,
      name: this.book.name,
      author: this.book.author
    };

    this.libraryService.create(data)
      .subscribe(
        data => {
          this.submitted=true;
          console.log(data);
        },
        err => {
          this.msgError  = err.error.message;
          console.log(err);
        });
  }

  newBook() {
    this.submitted = false;
    this.book.isbn = null;
    this.book.name = null;
    this.book.author = null;
    this.isDisabled = true;
  }

}
