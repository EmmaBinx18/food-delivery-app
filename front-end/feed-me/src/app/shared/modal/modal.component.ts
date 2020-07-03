import { Component, Input } from "@angular/core";
import { SnackbarService } from "../snackbar/snackbar.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  private eventsSubscription: Subscription;
  @Input() modalSubscription: Observable<any>;

  component: any = null;

  constructor(public snackbar: SnackbarService) {}

  ngOnInit() {
    this.eventsSubscription = this.modalSubscription.subscribe((data) => {
      this.component = data;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  closeForm() {
    this.component = null;
  }
}
