import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MealCategoriesComponent } from './meal-categories/meal-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { MealsComponent } from './dashboard/meals/meals.component';
import { DeliveriesComponent } from './dashboard/deliveries/deliveries.component';
import { AddMealComponent } from './dashboard/meals/add-meal/add-meal.component';

import { SharedModule } from '../../shared/shared.module';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { BusinessComponent } from './category/business/business.component';

@NgModule({
    declarations: [
        HomeComponent,
        MealCategoriesComponent,
        AboutUsComponent,
        OurServicesComponent,
        AccountComponent,
        CategoryComponent,
        DashboardComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent,
        StatsComponent,
        OrdersComponent,
        MealsComponent,
        DeliveriesComponent,
        AddMealComponent,
        OrderCartComponent,
        BusinessComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        FormsModule, ReactiveFormsModule
    ]
})
export class HomeModule { }