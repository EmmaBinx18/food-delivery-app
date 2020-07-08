import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnChanges {

  @Input() deliveries: any;
  @Input() error: boolean;

  loading: boolean = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.deliveries.currentValue.length != 0) {
      this.loading = false;
      console.log(this.deliveries);
    }
  }

}
