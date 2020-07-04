import { NgModule } from '@angular/core';

import { CategoryComponent } from './category.component';
import { BusinessComponent } from './business/business.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        CategoryComponent,
        BusinessComponent
    ],
    imports: [SharedModule],
    exports: [CategoryComponent]
})
export class CategoryModule { }