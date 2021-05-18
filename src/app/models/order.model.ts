import { Product } from "./product.model";
export class Order {
  constructor(
    public id: number,
    public products: Product[],
    public status:
      | "Completed"
      | "Creating"
      | "In delivery"
      | "Waiting for workplace"
      | "Waiting for delivery" = "Waiting for workplace"
  ) {}
}
