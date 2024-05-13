import { Component } from '@angular/core';
import {BookDetailComponent} from "../components/book/book-detail/book-detail.component";
import {BookService} from "../components/book/domain/service/book.service";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-books',
  standalone: true,
    imports: [
        BookDetailComponent,
        MatCardModule,
        NgForOf
    ],
  templateUrl: './page-book.component.html',
  styleUrl: './page-book.component.scss'
})
export class PageBookComponent {
    mockBook: any;

    constructor(
        private bookService: BookService,
    ) {  }

}
