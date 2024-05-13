export class Book{
  book_id: number;
  book_name: string;
  book_image: string;
  book_author: string;
  book_edition: string;
  book_resume: string;
  book_isbn: string;
  book_review: string;

  constructor(book_id: number, book_name: string, book_image: string, book_author: string, book_edition: string, book_resume: string, book_isbn: string, book_review: string) {
    this.book_id = book_id;
    this.book_name = book_name;
    this.book_image = book_image;
    this.book_author = book_author;
    this.book_edition = book_edition;
    this.book_resume = book_resume;
    this.book_isbn = book_isbn;
    this.book_review = book_review;
  }


}
