import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OrderItem } from '../models/order-item.model';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _cart = new BehaviorSubject<OrderItem[]>([]);

  constructor(private authService: AuthService) { }

  get cart() {
    return this._cart.asObservable();
  }

  fetchCart() {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return of('[]');
        }
        return of(localStorage.getItem(`cart${user.id}`));
      }),
      take(1),
      map(cartData => {
        if (!cartData) {
          return [];
        }
        const cart = JSON.parse(cartData);
        return cart;
      }),
      tap(cart => {
        this._cart.next(cart);
      })
    );
  }

  addItem(product: Product) {
    let fetchedUserId: number;
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          fetchedUserId = null;
        }
        fetchedUserId = user.id;
        return this.cart;
      }),
      take(1),
      tap(cart => {
        if (!cart.find(oi => oi.product.id === product.id)) {
          const newItem = new OrderItem(NaN, NaN, 1, product.unitPrice, product);
          cart.push(newItem);
          if (fetchedUserId) {
            this.storeCart(cart, fetchedUserId);
            this._cart.next(cart);
          } else {
            throw new Error('Morate se prijaviti na sistem.');
          }
        } else {
          throw new Error('Proizvod je već dodat u korpu.');
        }
      })
    );
  }

  removeItem(productId: number) {
    let fetchedUserId: number;
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          fetchedUserId = null;
        }
        fetchedUserId = user.id;
        return this.cart;
      }),
      take(1),
      tap(cart => {
        const newCart = cart.filter(oi => oi.product.id !== productId);
        if (fetchedUserId && newCart.length === 0) {
          localStorage.removeItem(`cart${fetchedUserId}`);
          this._cart.next([]);
        } else if (fetchedUserId) {
          this.storeCart(newCart, fetchedUserId);
          this._cart.next(newCart);
        }
      })
    ).subscribe();
  }

  quantityChange(productId: number, newQuantity: number) {
    let fetchedUserId: number;
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          fetchedUserId = null;
        }
        fetchedUserId = user.id;
        return this.cart;
      }),
      take(1),
      tap(cart => {
        const oi = cart.find(oi => oi.product.id === productId);
        if (fetchedUserId && newQuantity > 0 && newQuantity < oi.product.unitsInStock) {
          oi.quantity = newQuantity;
          oi.amount = oi.quantity * oi.product.unitPrice;
          this.storeCart(cart, fetchedUserId);
          this._cart.next(cart);
        }
      })
    ).subscribe();
  }

  private storeCart(cart: OrderItem[], userId: number) {
    const data = JSON.stringify(cart);
    localStorage.setItem(`cart${userId}`, data);
  }

}
