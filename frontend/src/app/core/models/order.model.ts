import { OrderItem } from './order-item.model';
import { User } from './user.model';

export class Order {
  constructor(
    public id: number,
    public contactName: string,
    public city: string,
    public address: string,
    public phone: string,
    public total: number,
    public createdAt: Date,
    public user: User,
    public order_items: OrderItem[]) { }

  calculateTotal() {
    this.total = 0;
    this.order_items.forEach(i => {
      this.total += i.amount;
    });
  }
}