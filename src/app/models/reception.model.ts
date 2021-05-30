import { ReceptionStatuses } from "./../enums/ReceptionStatuses";
import { Customer } from "./Customer.model";
export class Reception {
  constructor(
    public id: number,
    public getOrderTime: number,
    public startedGetOrderTime: number,
    public customersInQueue: Customer[],
    public hasCompletedCustomer: boolean,
    public currentOccupation: ReceptionStatuses
  ) {}
}
