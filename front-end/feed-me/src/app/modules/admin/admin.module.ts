import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserComponent } from './admin-home/user/user.component';
import { BusinessComponent } from './admin-home/business/business.component';
import { GeneralComponent } from './admin-home/general/general.component';

import {SharedModule} from '../../shared/shared.module'

@NgModule({
    declarations: [AdminHomeComponent, UserComponent, BusinessComponent, GeneralComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }