import {Book} from "./Book";
import {ICategory} from "./ICategory";
import {IMedia} from "./IMedia";

export interface IUser {
  id: number,
  username: string,
  email: string,
  zip_code?: string,
  city?: string,
  preferences: ICategory[],
  books: Book[],
  profilePicture?: IMedia,
}
