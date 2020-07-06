import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AccountComponent } from './account/account.component';
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';
import { CartComponent } from './cart/cart.component';

import { SharedModule } from '../../shared/shared.module';
import { MainModule } from './main/main.module';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersComponent } from './account/orders/orders.component';
import { AddressesComponent } from './account/addresses/addresses.component';
import { ProfileComponent } from './account/profile/profile.component';

@NgModule({
    declarations: [
        HomeComponent,
        AccountComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent,
        CartComponent,
        OrdersComponent,
        AddressesComponent,
        ProfileComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        MainModule,
        CategoryModule,
        DashboardModule
    ],
    entryComponents: [
        HomeChefRegisterComponent,
        DeliveryRegisterComponent
    ]
})
export class HomeModule { }