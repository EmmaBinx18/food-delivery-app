import { NgModule } from '@angular/core';

import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        DeliveryRegisterComponent,
        DeliveryDashboardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        DeliveryRegisterComponent,
        DeliveryDashboardComponent
    ]
})
export class DeliveryModule { }