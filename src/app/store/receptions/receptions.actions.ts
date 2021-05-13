import { Customer } from "./../../models/customer.model";
import { Action } from "@ngrx/store";

import { Simulation } from "./../../models/simulation.model";

export const SET_INITIAL_DATA = "Set initial data";
export const ADD_CUSTOMER_TO_QUEUE = "[reception] Add customer to queue";
export const REMOVE_CUSTOMER_BY_INDEX = "[reception] Remove customer by index";
export const START_GET_ORDER = "[reception] Start get order";
export const END_GET_ORDER = "[reception] End get order";
export const MOVE_QUEUE = "[reception] Move queue";

export class setInitialData implements Action {
  readonly type = SET_INITIAL_DATA;

  constructor(public payload: Simulation) {}
}

export class addCustomerToQueue implements Action {
  readonly type = ADD_CUSTOMER_TO_QUEUE;
}

export class removeCustomerByIndex implements Action {
  readonly type = REMOVE_CUSTOMER_BY_INDEX;

  constructor(public queueIndex: number, public customerInQueueIndex: number) {}
}

export class startGetOrder implements Action {
  readonly type = START_GET_ORDER;

  constructor(public queueIndex: number) {}
}

export class endGetOrder implements Action {
  readonly type = END_GET_ORDER;

  constructor(public queueIndex: number) {}
}

export type ReceptionsActions =
  | setInitialData
  | addCustomerToQueue
  | removeCustomerByIndex
  | startGetOrder
  | endGetOrder;
