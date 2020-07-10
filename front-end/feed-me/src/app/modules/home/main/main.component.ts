import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Output() openCategoryEmitter = new EventEmitter<any>();
  @Output() changeDisplatEmitter = new EventEmitter<any>();

  constructor() { }

  openCategory(event: any) {
    this.openCategoryEmitter.emit(event);
  }

  changeDisplay(option: string) {
    this.changeDisplatEmitter.emit(option);
  }

}
