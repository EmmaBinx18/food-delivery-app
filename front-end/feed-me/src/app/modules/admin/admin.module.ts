import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BusinessComponent } from './business/business.component';
import { UserComponent } from './user/user.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [AdminComponent, BusinessComponent, UserComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }