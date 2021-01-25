import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';

interface OrdersResponseData {
  status: string,
  orders: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>([]);
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) { }

  public get orders() {
    return this._orders.asObservable();
  }

  fetch(orderId: number) {
    return this.http.get<{ status: string, order: Order }>(`${this.apiUrl}/orders/${orderId}`)
      .pipe(
        map(response => {
          let order = response.order;
          order.total = +order.total;
          order.createdAt = new Date(order.createdAt);
          order.order_items.forEach(orderItem => {
            orderItem.amount = +orderItem.amount;
            orderItem.product.unitPrice = +orderItem.product.unitPrice;
          });

          return order;
        })
      );
  }

  fetchOrders() {
    return this.http.get<OrdersResponseData>(`${this.apiUrl}/orders`)
      .pipe(
        tap(response => {
          response.orders.forEach(order => {
            order.total = +order.total;
            order.createdAt = new Date(order.createdAt);
            order.order_items.forEach(orderItem => {
              orderItem.amount = +orderItem.amount;
              orderItem.product.unitPrice = +orderItem.product.unitPrice;
            });
          });
          
          this._orders.next(response.orders);
        }))
      .subscribe();
  }

  save(contactName: string, city: string, address: string, phone: string) {
    let fetchedUser;
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          fetchedUser = user;
          return this.shoppingCartService.fetchCart();
        }
        throw new Error('Morate se prijaviti na sistem kako bi naručili proizvode.');
      }),
      take(1),
      switchMap(items => {
        if (items && items.length > 0) {
          const order = new Order(NaN, contactName, city, address, phone, 0, new Date(), fetchedUser, items);
          order.calculateTotal();
          return this.http.post<{ status: string, message: string }>(`${this.apiUrl}/orders`, {
            ...order
          });
        }
        throw new Error('Vaša korpa je prazna.');
      }),
      tap(res => {
        if (res.status && res.status === 'OK') {
          localStorage.removeItem(`cart${fetchedUser.id}`);
        }
      }));
  }
}
