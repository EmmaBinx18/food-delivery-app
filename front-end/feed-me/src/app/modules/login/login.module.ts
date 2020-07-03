import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import {MapComponent} from '../map/map.component'

@NgModule({
    declarations: [LoginComponent,MapComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
        
    ]
})
export class LoginModule { }