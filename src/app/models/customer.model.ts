import { Order } from "./order.model";
export class Customer {
  constructor(public id: number, public order: Order) {}
}
