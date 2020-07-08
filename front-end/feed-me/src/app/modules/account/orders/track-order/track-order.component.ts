import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnChanges {

  @Input() order: any;
  @Output() closeTrackingEmitter = new EventEmitter();

  loading: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.order.currentValue) {
      this.loading = false;
    }
  }

  closeTracking() {
    this.closeTrackingEmitter.emit();
  }

}
