import { Product } from "./product.model";
export class Order {
  constructor(public id: number, public products: Product[]) {}
}
