import { Injectable, Renderer2 } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ModalService {

  component: any = null;
  componentSubject: Subject<string> = new Subject<string>();

  constructor(private renderer: Renderer2) {
    this.componentSubject.subscribe(option => {
      this.component = option;
    });
  }

  open(option: string) {
    this.renderer.setAttribute(document.body, 'position', 'fixed');
    this.componentSubject.next(option);
  }

  close() {
    this.renderer.setAttribute(document.body, 'position', 'relative');
    this.componentSubject.next(null);
  }
}
