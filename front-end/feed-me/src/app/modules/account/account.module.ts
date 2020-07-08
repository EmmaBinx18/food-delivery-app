import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        AccountComponent,
        AddressesComponent,
        ProfileComponent,
        OrdersComponent
    ],
    imports: [
        SharedModule,
        AccountRoutingModule
    ]
})
export class AccountModule { }