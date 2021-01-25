import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    new Category(1, 'Mobilni Telefoni'),
    new Category(2, 'Računari'),
    new Category(3, 'Laptopovi'),
    new Category(4, 'Televizori')
  ];

  constructor() { }

  getCategories() {
    return this.categories.slice();
  }

  getCategory(categoryId: number) {
    return { ...this.categories.find(category => category.id === categoryId) };
  }
}
