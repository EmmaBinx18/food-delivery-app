import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HomeChefRegisterComponent } from './modals/home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './modals/delivery-register/delivery-register.component';
import { ModalsComponent } from './modals/modals.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        SnackbarComponent,
        SpinnerComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent,
        ModalsComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        SnackbarComponent,
        SpinnerComponent,
        ModalsComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule { }
