import { Category } from './category.model';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public unitPrice: number,
    public imagePath: string,
    public unitsInStock: number,
    public category: Category) { }
}