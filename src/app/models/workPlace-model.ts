import { Order } from "./order.model";
export class WorkPlace {
  constructor(
    public id: number,
    public isEmpty: boolean,
    public order?: Order
  ) {}
}
