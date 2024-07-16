import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { Category } from "../add-book/category.model";
import { IMedia } from "../../../profile/domain/interface/IMedia";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import { Book } from "../../domain/models/book";
import { UploadService } from "../../../services/upload.service";
import { CategoryService } from "../../../services/category.service";
import { BookService } from "../../domain/service/book.service";
import {environment} from "../../../../environments/environment";
import {UserIdService} from "../../../services/userId.service";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink
  ],

  styleUrls: ['./update-book.component.scss'] // Corrected from styleUrl to styleUrls
})
export class UpdateBookComponent implements OnInit {

  book!: Book;

  coverImage: IMedia | null = null;
  fileEvent!: Event;
  id: number = 0;
  selectedFile: File | null =null;
  categories: Category[] = [];




  constructor(
    private bookService: BookService,
    private userIdService: UserIdService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;
      console.log('User ID',this.id);
    });
    if (!!this.id) {
      this.id = +this.route.snapshot.paramMap.get('id')!;
      this.bookService.getBookById(this.id).subscribe((response) => {
        this.book = response;
    });
  }
}



  uploadFile(event:Event) {
    this.uploadService.uploadFile(this.fileEvent).subscribe({
      next: (res: IMedia | null) => {
        this.coverImage = res;
        this.updateBook();
      },
      error: (err: any) => console.error('Upload error', err)
    });
  }

  updateBook() {
    if (!this.book.owner) {
      this.userIdService.getUserId.subscribe(id => {
      //  this.book.owner = UserIdService; // Assurez-vous que ownerId est correctement défini ici
      });
    }

    this.bookService.updateBook(this.id, this.book).subscribe(
      () => {
        console.log('Livre mis à jour avec succès');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du livre', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
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

  protected readonly Event = Event;
  protected readonly event = event;
}
