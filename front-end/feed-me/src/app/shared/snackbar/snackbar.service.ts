import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  snackbar: any = null;
  snackbarSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.snackbarSubject.subscribe(value => {
      this.snackbar = value;
    });
  }

  show(value: any) {
    this.snackbarSubject.next(value);
  }

  hide() {
    this.snackbarSubject.next(null);
  }
}
