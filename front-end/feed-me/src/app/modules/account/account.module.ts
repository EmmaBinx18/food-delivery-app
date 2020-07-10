import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TrackOrderComponent } from './orders/track-order/track-order.component';

@NgModule({
    declarations: [
        AccountComponent,
        AddressesComponent,
        ProfileComponent,
        OrdersComponent,
        TrackOrderComponent
    ],
    imports: [
        SharedModule,
        AccountRoutingModule
    ]
})
export class AccountModule { }