import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-delivery',
  templateUrl: './current-delivery.component.html',
  styleUrls: ['./current-delivery.component.scss']
})
export class CurrentDeliveryComponent implements OnInit {

  @Input() delivery: any;

  constructor() { }

  ngOnInit(): void {
  }

}
