import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { MealCategoriesComponent } from './meal-categories/meal-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [HomeComponent, CarouselComponent, MealCategoriesComponent, AboutUsComponent, OurServicesComponent],
    imports: [
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }