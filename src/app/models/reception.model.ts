import { Customer } from "./customer.model";
export class Reception {
  constructor(
    public id: number,
    public getOrderTime: number,
    public customersInQueue: Customer[],
    public currentOccupation: "Empty" | "Getting order" = "Empty" // | "Wait new customer"
  ) {}
}
