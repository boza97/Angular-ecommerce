import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';


@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  products: Product[] = [];
  private subscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subscription = this.productService.products.subscribe(
      products => {
        this.products = products;
        this.categories = this.categoryService.getCategories();
      },
      error => {
        console.log(error);
      }
    );
    this.productService.fetchProducts();
  }

  onAddToCart(product: Product) {
    this.shoppingCartService.addItem(product).subscribe(
      () => {
        this.openModalMessage('Obaveštenje', 'Proizvod je uspešno dodat u korpu.');
      },
      error => {
        this.openModalMessage('Obaveštenje', error);
      }
    );
  }

  onCategoryChange(categoryId: string) {
    if (categoryId === '*') {
      this.productService.fetchProducts();
    } else {
      this.productService.fetchProductsByCategory(+categoryId);
    }
  }

  private openModalMessage(title: string, message: string) {
    const modalRef = this.modalService.open(ModalMessageComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
