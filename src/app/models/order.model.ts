import { OrderStatuses } from "./../enums/OrderStatuses";
import { Product } from "./product.model";
export class Order {
  constructor(
    public id: number,
    public customerName: string,
    public products: Product[],
    public status: OrderStatuses = OrderStatuses.WaitingForWorkPlace
  ) {}
}
