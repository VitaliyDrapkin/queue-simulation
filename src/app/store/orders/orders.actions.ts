import { Order } from "./../../models/order.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@map/PREPARE_SIMULATION";
export const ADD_NEW_ORDER = "@@map/ADD_NEW_ORDER";
export const CHANGE_ORDER_STATUS = "@@map/CHANGE_ORDER_STATUS";

export class startSimulation implements Action {
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
      status:
        | "Completed"
        | "Creating"
        | "In delivery"
        | "Waiting for workplace"
        | "Waiting for delivery";
      orderId: number;
    }
  ) {}
}

export type OrdersActions = startSimulation | addOrder | changeOrderStatus;
