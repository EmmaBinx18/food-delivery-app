import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { MealsComponent } from './dashboard/meals/meals.component';
import { DeliveriesComponent } from './dashboard/deliveries/deliveries.component';
import { AddMealComponent } from './dashboard/meals/add-meal/add-meal.component';
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';
import { CartComponent } from './cart/cart.component';

import { SharedModule } from '../../shared/shared.module';
import { MainModule } from './main/main.module';
import { CategoryModule } from './category/category.module';

@NgModule({
    declarations: [
        HomeComponent,
        AccountComponent,
        DashboardComponent,
        StatsComponent,
        OrdersComponent,
        MealsComponent,
        DeliveriesComponent,
        AddMealComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent,
        CartComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        MainModule,
        CategoryModule
    ],
    entryComponents: [
        HomeChefRegisterComponent,
        DeliveryRegisterComponent
    ]
})
export class HomeModule { }