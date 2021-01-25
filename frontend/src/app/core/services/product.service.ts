import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([]);
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get products() {
    return this._products.asObservable();
  }

  fetchProducts() {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(
        tap(products => {
          products.map(p => p.unitPrice = +p.unitPrice);
          this._products.next(products);
        })
      )
      .subscribe();
  }

  fetchProductsByCategory(categoryId: number) {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products/category/${categoryId}`)
      .pipe(
        tap(products => {
          products.map(p => p.unitPrice = +p.unitPrice);
          this._products.next(products);
        })
      )
      .subscribe();
  }

  fetchFeaturedProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products/featured`).pipe(map(products => {
      products.map(p => p.unitPrice = +p.unitPrice);
      return products;
    }));
  }

  fetchProduct(productId: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`).pipe(
      map(product => {
        product.unitPrice = +product.unitPrice;
        return product;
      })
    );
  }
}
