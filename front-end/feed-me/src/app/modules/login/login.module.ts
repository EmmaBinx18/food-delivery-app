import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import {TrackingMapComponent} from '../map/tracking-map/tracking-map.component'

@NgModule({
    declarations: [LoginComponent,TrackingMapComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
        
    ]
})
export class LoginModule { }