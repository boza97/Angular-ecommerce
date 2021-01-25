import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {
  @Input() orderId: number;
  order: Order = null;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.orderId = changes.orderId.currentValue;
    if (this.orderId) {
      this.ordersService.fetch(this.orderId).subscribe(order => {
        this.order = order;
      });
    }
  }

}
