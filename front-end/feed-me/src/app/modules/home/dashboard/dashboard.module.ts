import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { HomeChefDashboardComponent } from './home-chef-dashboard/home-chef-dashboard.component';
import { DeliveryDashboardComponent } from './delivery-dashboard/delivery-dashboard.component';
import { StatsComponent } from './stats/stats.component';
import { OrdersComponent } from './home-chef-dashboard/orders/orders.component';
import { ProductsComponent } from './home-chef-dashboard/products/products.component';
import { DeliveriesComponent } from './delivery-dashboard/deliveries/deliveries.component';
import { AddProductComponent } from './home-chef-dashboard/products/add-product/add-product.component';
import { CurrentDeliveryComponent } from './delivery-dashboard/current-delivery/current-delivery.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        DashboardComponent,
        StatsComponent,
        OrdersComponent,
        ProductsComponent,
        DeliveriesComponent,
        AddProductComponent,
        HomeChefDashboardComponent,
        DeliveryDashboardComponent,
        CurrentDeliveryComponent
    ],
    imports: [SharedModule],
    exports: [DashboardComponent]
})
export class DashboardModule { }