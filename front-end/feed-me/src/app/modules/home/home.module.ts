import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MealCategoriesComponent } from './meal-categories/meal-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AccountComponent } from './account/account.component';

import { HomeChefModule } from './home-chef/home-chef.module';
import { DeliveryModule } from './delivery/delivery.module';

import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './category/category.component';

@NgModule({
    declarations: [
        HomeComponent,
        MealCategoriesComponent,
        AboutUsComponent,
        OurServicesComponent,
        AccountComponent,
        CategoryComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        HomeChefModule,
        DeliveryModule
    ]
})
export class HomeModule { }