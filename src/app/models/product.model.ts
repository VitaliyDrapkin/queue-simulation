import { Ingredient } from "./ingredient.model";
export class Product {
  constructor(
    public id: number,
    public productName: string,
    public image: string,
    public ingredients: Ingredient[],
    public delayTime?: number,
    public isCreated: boolean = false
  ) {}
}
