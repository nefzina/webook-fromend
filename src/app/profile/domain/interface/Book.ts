import {IMedia} from "./IMedia";

export interface Book {
  id: number,
  name: string,
  image: IMedia,
  author: string,
  edition: string,
  review: string,
  resume: string,
  isbn: string,
  ownerId: number,
}
