import { Product } from "./product.model";
export class Workplace {
  constructor(
    public id: number,
    public isEmpty: boolean = true,
    public addedProductTime: number = -1,
    public orderId?: number,
    public product?: Product
  ) {}
}
