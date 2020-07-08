import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [CartComponent],
    imports: [SharedModule],
    exports: [CartComponent]
})
export class CartModule { }