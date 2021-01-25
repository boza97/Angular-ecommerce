import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsComponent } from './products.component';

const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductsHomeComponent },
      { path: ':id', component: ProductDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }