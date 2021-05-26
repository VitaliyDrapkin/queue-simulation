import { Order } from "src/app/models/order.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@deliveries/PREPARE_SIMULATION";
export const ADD_ORDER_TO_DELIVERY = "@@deliveries/ADD_ORDER_TO_DELIVERY";
export const REMOVE_ORDER_FROM_DELIVERY =
  "@@deliveries/REMOVE_ORDER_FROM_DELIVERY";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;

  constructor(public payload: { deliveries: number }) {}
}

export class addOrderToDelivery implements Action {
  readonly type = ADD_ORDER_TO_DELIVERY;

  constructor(
    public payload: { order: Order; deliveryId: number; currentTime: number }
  ) {}
}

export class removeOrderFromDelivery implements Action {
  readonly type = REMOVE_ORDER_FROM_DELIVERY;

  constructor(public payload: { deliveryIndex: number }) {}
}

export type DeliveriesActions =
  | PrepareSimulation
  | addOrderToDelivery
  | removeOrderFromDelivery;
