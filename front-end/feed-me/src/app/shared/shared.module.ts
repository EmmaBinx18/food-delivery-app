import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { LoaderComponent } from "./loader/loader.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    LoaderComponent,
    ModalComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    LoaderComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SharedModule { }
