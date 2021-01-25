import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  selectedOrderId: number = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedOrder(orderId: number) {
    this.selectedOrderId = orderId;
  }

}
