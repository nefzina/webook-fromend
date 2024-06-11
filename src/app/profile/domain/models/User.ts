import {IUser} from "../interface/IUser";
import {ICategory} from "../interface/ICategory";
import {Book} from "../interface/Book";
import {IMedia} from "../interface/IMedia";

export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public zip_code?: string,
    public city?: string,
    public preferences: ICategory[] = [],
    public books: Book[] = [],
    public profilePicture?: IMedia,
  ) {
  }
}
