import {Component, NgZone, OnInit} from '@angular/core';
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
import {ProfileService} from "../../../profile/domain/services/profile.service";
import {IUser} from "../../../profile/domain/interface/IUser";

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
  user!: IUser;

  coverImage: IMedia | null = null;
  fileEvent!: Event;
  userId: number = 0;
  bookId:number =0;
  selectedFile: File | null =null;
  categories: Category[] = [];
  successMessage: string = '';

  constructor(
    private bookService: BookService,
    private userIdService: UserIdService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(this.bookId).subscribe((response) => {
      this.book = response;
      this.coverImage = response.coverImage;
    });
    this.userIdService.getUserId.subscribe(id => {
      this.userId = id;
      console.log('User ID', this.userId);

    });

    if (!!this.userId) {
      this.profileService.getUserById(this.userId).subscribe((response) => {
        this.user = response;
        this.book.owner = response;
      })
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
    console.log("livre", this.book);
    this.bookService.updateBook(this.bookId, this.book).subscribe(
      () => {
        console.log('Livre mis à jour avec succès');
        this.successMessage = 'Livre mis à jour avec succès';
        this.redirectAfterUpdate();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du livre', error);
      }
    );
  }

  redirectAfterUpdate() {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/home', this.book.id]);
      });
    }, 2000);
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
