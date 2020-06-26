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
})
export class SharedModule { }
