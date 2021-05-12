import { Order } from "./order.model";
export class Delivery {
  constructor(
    public id: number,
    public isEmpty: boolean,
    public order?: Order
  ) {}
}
