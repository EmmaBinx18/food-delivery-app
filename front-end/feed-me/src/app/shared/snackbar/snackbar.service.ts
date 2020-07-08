import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  snackbar: any = null;
  snackbarSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.snackbarSubject.subscribe(value => {
      this.snackbar = value;
    });
  }

  success(message: string) {
    this.snackbarSubject.next({ message, class: 'snackbar-success' });
  }

  error(message: string) {
    this.snackbarSubject.next({ message, class: 'snackbar-error' });
  }

  hide() {
    this.snackbarSubject.next(null);
  }
}
