import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterBusinessComponent } from './register-business.component';
import { RegisterBusinessRoutingModule } from './register-business-routing.module';

@NgModule({
    declarations: [RegisterBusinessComponent],
    imports: [
        CommonModule,
        RegisterBusinessRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class RegisterBusinessModule { }