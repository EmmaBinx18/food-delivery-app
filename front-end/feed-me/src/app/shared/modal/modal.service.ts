import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ModalService {

  component: any = null;
  componentSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.componentSubject.subscribe(option => {
      this.component = option;
    });
  }

  open(option: string) {
    this.componentSubject.next(option);
  }

  close() {
    this.componentSubject.next(null);
  }
}
