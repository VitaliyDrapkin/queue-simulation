import { Ingredient } from "./ingredient.model";
export class Product {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public ingredients: Ingredient[],
    public timeOfCreating?: number
  ) {}
}
