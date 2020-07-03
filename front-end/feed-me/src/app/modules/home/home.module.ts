import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MealCategoriesComponent } from './meal-categories/meal-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { MealsComponent } from './dashboard/meals/meals.component';
import { DeliveriesComponent } from './dashboard/deliveries/deliveries.component';
import { AddMealComponent } from './dashboard/meals/add-meal/add-meal.component';
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';
import { BusinessComponent } from './category/business/business.component';

import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
    declarations: [
        HomeComponent,
        MealCategoriesComponent,
        AboutUsComponent,
        OurServicesComponent,
        AccountComponent,
        CategoryComponent,
        DashboardComponent,
        StatsComponent,
        OrdersComponent,
        MealsComponent,
        DeliveriesComponent,
        AddMealComponent,
        BusinessComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent,
        CartComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule
    ],
    entryComponents: [
        HomeChefRegisterComponent,
        DeliveryRegisterComponent
    ]
})
export class HomeModule { }