import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';
import { Order } from '../../core/models/order.model';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[];
  @Output() selectedOrder = new EventEmitter<number>();
  private ordersSubscription: Subscription;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersSubscription = this.ordersService.orders.subscribe(orders => {
      this.orders = orders;
    });

    this.ordersService.fetchOrders();
  }

  onDetails(orderId: number) {
    this.selectedOrder.emit(orderId);
  }

  ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
  }

}
