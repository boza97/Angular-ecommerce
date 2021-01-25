import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrdersModule {}