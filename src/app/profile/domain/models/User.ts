import {IUser} from "../interface/IUser";
import {Category} from "../interface/Category";
import {Book} from "../interface/Book";
import {IMedia} from "../interface/IMedia";

export class User implements IUser {
  constructor(
    public username: string,
    public email: string,
    public zip_code: number,
    public city: string,
    public preferences: Category[] = [],
    public books: Book[] = [],
    public profilePicture?: IMedia,
  ) { }
}
