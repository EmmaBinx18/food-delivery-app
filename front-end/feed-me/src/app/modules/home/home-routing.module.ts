
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { Role } from 'src/app/core/models/role.model';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.HomeChef, Role.Delivery] }
    },
    {
        path: ':category',
        component: CategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }