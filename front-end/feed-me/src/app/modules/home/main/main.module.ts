import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MealCategoriesComponent } from './meal-categories/meal-categories.component';
import { OurServicesComponent } from './our-services/our-services.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        MainComponent,
        AboutUsComponent,
        MealCategoriesComponent,
        OurServicesComponent
    ],
    imports: [SharedModule],
    exports: [MainComponent]
})
export class MainModule { }