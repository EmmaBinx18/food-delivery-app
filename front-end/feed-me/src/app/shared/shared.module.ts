<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        CommonModule
    ]
=======
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { LoaderComponent } from "./loader/loader.component";
import { ModalComponent } from "./modal/modal.component";
import { MapComponent } from "./map/map.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    LoaderComponent,
    ModalComponent,
    MapComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SnackbarComponent,
    LoaderComponent,
    ModalComponent,
    FormsModule,
    MapComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
})
export class SharedModule { }
