import { Product } from './product.model';

export class OrderItem {
  constructor(
    public orderId: number,
    public id: number,
    public quantity: number,
    public amount: number,
    public product: Product) {}
}