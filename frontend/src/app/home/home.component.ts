import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  images = ['../../assets/images/slider/slide1.png', '../../assets/images/slider/slide2.jpg',
            '../../assets/images/slider/slide3.jpg', '../../assets/images/slider/slide4.jpg'];
  products: Product[] = [];
  private subscription: Subscription;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.fetchFeaturedProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
