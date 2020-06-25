import { NgModule } from '@angular/core';

import { HomeChefRegisterComponent } from './home-chef-register/home-chef-register.component';
import { HomeChefDashboardComponent } from './home-chef-dashboard/home-chef-dashboard.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        HomeChefRegisterComponent,
        HomeChefDashboardComponent
    ],
    imports: [
        SharedModule
    ]
})
export class HomeChefModule { }