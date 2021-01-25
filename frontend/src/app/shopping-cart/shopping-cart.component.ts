import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderItem } from '../core/models/order-item.model';
import { ShoppingCartService } from '../core/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart: OrderItem[] = [];
  total: number = 0;
  private cartSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService.cart.subscribe(
      cart => {
        this.cart = cart;
        if (cart.length > 0) {
          this.calculateTotal();
        }
      }
    );

    this.shoppingCartService.fetchCart().subscribe();
  }

  onQuantityChange(item: OrderItem, event) {
    const newQuantity = event.target.value;
    this.shoppingCartService.quantityChange(item.product.id, newQuantity);

  }

  onRemoveFromCart(item: OrderItem) {
    this.shoppingCartService.removeItem(item.product.id);
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  private calculateTotal() {
    this.total = 0;
    this.cart.forEach(i => this.total += i.amount);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
