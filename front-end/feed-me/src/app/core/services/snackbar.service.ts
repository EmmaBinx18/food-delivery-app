import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  open(message: string) {
    const snackbar = document.querySelector('#snackbar');
    const snackBarMessage = document.querySelector('#snackbar-message');
    snackBarMessage.innerHTML = message;

    this.show(snackbar);
    this.hide(snackbar);
  }

  show(snackbar: any) {
    snackbar.classList.add('show');
  }

  hide(snackbar: any) {
    setTimeout(() => {
      snackbar.classList.remove('show');
      snackbar.classList.add('hide');
    }, 4000);
  }
}
