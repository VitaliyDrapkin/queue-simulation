import { customerOrder } from "./CustomerOrder.model";
export class Customer {
  constructor(
    public id: number,
    public customerOrder: customerOrder,
    public name: string
  ) {}
}
