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

  bookForm: FormGroup;
  categories: Category[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  coverImage: IMedia | null = null;
  fileEvent!: Event;
  bookId: number = 0;


  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      edition: [''],
      review: [''],
      resume: [''],
      isbn: [''],
      coverImage: [''],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.bookId = +id;
        this.loadBookDetails(this.bookId);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  loadBookDetails(bookId: number): void {
    this.bookService.getBookById(bookId).subscribe({
      next: (book: { [x: string]: any; coverImage?: any; }) => {
        this.bookForm.patchValue(book);
        this.selectedImage = book.coverImage?.url || null;
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: Event): void {
    this.fileEvent = event;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result !== undefined) {
          this.selectedImage = result;
        }
      };
      reader.readAsDataURL(file);
    }
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
    const updatedBook: Book = this.bookForm.value;
    if (this.coverImage) {
      updatedBook.coverImage = this.coverImage;
      updatedBook.bookCategory = this.categories[this.bookForm.get("categoryId")?.value - 1];
    }
    this.bookService.updateBook(updatedBook, this.bookId).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error(err)
    });
  }
  getBookCoverUrl(filename: string): string {
    console.log(filename)
    return `${environment.API_URL}/uploads/${filename}`;
  }
  onSubmit(): void {
    if (this.bookForm.valid) {
      if (this.fileEvent) {
        this.uploadFile();
      } else {
        this.updateBook();
      }
    }
  }
}
