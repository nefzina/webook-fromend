import {Book} from "./Book";
import {Category} from "./Category";
import {IMedia} from "./IMedia";

export interface IUser {
  username: string,
  email: string,
  zip_code: number,
  city: string,
  preferences: Category[],
  books: Book[],
  profilePicture?: IMedia,
}
