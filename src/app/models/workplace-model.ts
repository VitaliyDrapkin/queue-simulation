import { Order } from "src/app/models/order.model";
export class Workplace {
  constructor(
    public id: number,
    public addedProductTime: number = -1,
    public order?: Order,
    public currentProductIndex?: number
  ) {}
}
