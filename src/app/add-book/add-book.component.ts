import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators} from "@angular/forms";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {AuthenticationService} from "../auth/domain/services/authentication.service";
import {Router} from "@angular/router";
import {passwordMatchValidator} from "../auth/application/passwordMatch";
import {AddBookService} from "../services/AddBook.service";
import {BookService} from "../book/domain/service/book.service";
import {Book} from "../book/domain/models/book";
import {Category} from "../add-book/category.model";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatGridTile,
    MatGridList,
    CommonModule
  ],
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  categories: Category[] = [];
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private addBookService: AddBookService,
    private router: Router,
    private categoryService: CategoryService,
    private authService: AuthenticationService
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
  }



  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const maxSize = 300; // Taille maximale souhaitée
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg'); // Format de l'image (JPEG, PNG, etc.)
            this.selectedImage = dataUrl;

          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  onSubmit(): void {
    if (this.bookForm.valid) {
     // const ownerId = this.authService.getUserId(); // j'utilise le service d'authentification pour obtenir l'ID de l'utilisateur connecté

        const formData = new FormData();
        for (const key in this.bookForm.value) {
          formData.append(key, this.bookForm.value[key]);
        }
        this.addBookService.createBook(formData).subscribe({
          next: () => this.router.navigate(['/books']),
          error: (err) => console.error(err)
        });


    }
  }


}
