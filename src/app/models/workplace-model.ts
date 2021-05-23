import { Product } from "./product.model";
export class Workplace {
  constructor(
    public id: number,
    public addedProductTime: number = -1,
    public orderId?: number,
    public product?: Product
  ) {}
}
