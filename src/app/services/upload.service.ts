import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {catchError, interval, Observable, of, switchMap, takeUntil, tap} from "rxjs";
import {IMedia} from "../profile/domain/interface/IMedia";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private fileData!: IMedia;

  constructor(private apiService: ApiService) {
  }

  uploadFile(event: Event) {
    // Check if the event target is an instance of HTMLInputElement
    const input = event.target as HTMLInputElement;

    // Check if the input element has files
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      console.log("event target files", file);
      return this.processFile(file);
      // Check if file has been uploaded
    //   return interval(500).pipe(
    //     switchMap(() => {
    //       return this.processFile(file);
    //     }),
    //     takeUntil(of(true))  // This can be modified to include your condition for stopping the interval
    //   );
    } else {
      return new Observable<IMedia>((observer) => observer.complete()); // empty observable if no file is selected
     }
  }

// Runs after user uploads file;
  processFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.postUpload<IMedia>("uploads", formData)
      .pipe(tap(res => this.fileData = res),
        catchError(err => {
          console.error('Upload error', err);
          throw err;
        })
      )
  }
}
