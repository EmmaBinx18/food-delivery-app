import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { DeliveryRegisterComponent } from './delivery-register/delivery-register.component';

import { SharedModule } from '../../shared/shared.module';
import { MainModule } from './main/main.module';
import { CategoryModule } from './category/category.module';

@NgModule({
    declarations: [
        HomeComponent,
        HomeChefRegisterComponent,
        DeliveryRegisterComponent
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