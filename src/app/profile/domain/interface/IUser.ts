import {Book} from "./Book";
import {ICategory} from "./ICategory";
import {IMedia} from "./IMedia";

export interface IUser {
  username: string,
  email: string,
  zip_code: number,
  city: string,
  preferences: ICategory[],
  books: Book[],
  profilePicture?: IMedia,
}
