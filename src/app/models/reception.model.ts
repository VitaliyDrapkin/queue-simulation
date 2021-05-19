import { Customer } from "./customer.model";
export class Reception {
  constructor(
    public id: number,
    public getOrderTime: number,
    public startedGetOrderTime: number,
    public customersInQueue: Customer[],
    public isHasCompletedCustomer: boolean,
    public currentOccupation: "Empty" | "Getting order" = "Empty" //
  ) {}
}
