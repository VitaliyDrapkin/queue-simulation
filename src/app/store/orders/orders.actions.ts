import { OrderStatuses } from "./../../enums/OrderStatuses";
import { Order } from "./../../models/order.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@orders/PREPARE_SIMULATION";
export const ADD_NEW_ORDER = "@@orders/ADD_NEW_ORDER";
export const CHANGE_ORDER_STATUS = "@@orders/CHANGE_ORDER_STATUS";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
}
export class addOrder implements Action {
  readonly type = ADD_NEW_ORDER;
  constructor(public order: Order) {}
}

export class changeOrderStatus implements Action {
  readonly type = CHANGE_ORDER_STATUS;
  constructor(
    public payload: {
      status: OrderStatuses;
      orderId: number;
    }
  ) {}
}

export type OrdersActions = PrepareSimulation | addOrder | changeOrderStatus;
