import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { Category } from "../add-book/category.model";
import { IMedia } from "../../../profile/domain/interface/IMedia";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../../domain/models/book";
import { UploadService } from "../../../services/upload.service";
import { CategoryService } from "../../../services/category.service";
import { BookService } from "../../domain/service/book.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'] // Corrected from styleUrl to styleUrls
})
export class UpdateBookComponent implements OnInit {

  book!: Book;
  categories: Category[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  coverImage: IMedia | null = null;
  fileEvent!: Event;
  id: number = 0;
  selectedFile: File | null =null;


  constructor(
    private bookService: BookService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(this.id).subscribe((response) => {
      this.book = response;
    });
  }



  uploadFile() {
    this.uploadService.uploadFile(this.fileEvent).subscribe({
      next: (res: IMedia | null) => {
        this.coverImage = res;
        this.updateBook();
      },
      error: (err: any) => console.error('Upload error', err)
    });
  }

  updateBook() {
    this.bookService.updateBook(this.id, this.book).subscribe(
      () => {
        console.log('Livre mis à jour avec succès');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du livre', error);
      }
    );
  }
  getBookCoverUrl(filename: string): string {
    console.log(filename)
    return `${environment.API_URL}/uploads/${filename}`;
  }
  onSubmit() {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.fileEvent).subscribe(
        {
          next: (res) => {
            this.book.coverImage = res;
            this.updateBook();
          },
          error: (err) => console.error('Upload error', err),
        }
      );
    } else {
      this.updateBook();
    }
  }

}
