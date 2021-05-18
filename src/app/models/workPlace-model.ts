import { Order } from "./order.model";
export class Workplace {
  constructor(
    public id: number,
    public isEmpty: boolean = true,
    public order?: Order
  ) {}
}
