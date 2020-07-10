import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
<<<<<<< HEAD
import { MealCategoriesComponent } from './meal-categories/meal-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AccountComponent } from './account/account.component';

import { SharedModule } from '../../shared/shared.module';
=======
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';

import { SharedModule } from '../../shared/shared.module';
import { MainModule } from './main/main.module';
import { CategoryModule } from './category/category.module';
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974

@NgModule({
    declarations: [
        HomeComponent,
<<<<<<< HEAD
        MealCategoriesComponent,
        AboutUsComponent,
        OurServicesComponent,
        AccountComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule
=======
        HomeChefRegisterComponent,
        DeliveryRegisterComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        MainModule,
        CategoryModule
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
    ]
})
export class HomeModule { }