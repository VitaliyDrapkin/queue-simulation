import { Order } from "./order.model";
export class Delivery {
  constructor(
    public id: number,
    public deliveryStartTime: number,
    public deliveryTime: number = 10,
    public order?: Order
  ) {}
}
