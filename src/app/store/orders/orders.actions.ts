import { Order } from "./../../models/order.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@map/PREPARE_SIMULATION";
export const ADD_NEW_ORDER = "@@map/ADD_NEW_ORDER";

export class startSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
}
export class addOrder implements Action {
  readonly type = ADD_NEW_ORDER;
  constructor(public order: Order) {}
}

export type OrdersActions = startSimulation | addOrder;
