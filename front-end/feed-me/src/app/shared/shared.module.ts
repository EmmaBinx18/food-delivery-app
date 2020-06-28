import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MapBoxComponent } from './map-box/map-box.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        MapBoxComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        CommonModule,
        MapBoxComponent
    ]
})
export class SharedModule { }
