import { Simulation } from "./../../models/simulation.model";
import { Customer } from "./../../models/customer.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@map/PREPARE_SIMULATION";
export const ADD_CUSTOMER_TO_QUEUE = "@@map/ADD_CUSTOMER_TO_QUEUE";
export const REMOVE_CUSTOMER_BY_INDEX = "@@map/REMOVE_CUSTOMER_BY_INDEX";
export const START_GET_ORDER = "@@map/START_GET_ORDER";
export const END_GET_ORDER = "@@map/END_GET_ORDER";
export const MOVE_QUEUE = "@@map/MOVE_QUEUE";

export class startSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(public payload: Simulation) {}
}

export class addCustomerToQueue implements Action {
  readonly type = ADD_CUSTOMER_TO_QUEUE;
}

export class removeCustomerByIndex implements Action {
  readonly type = REMOVE_CUSTOMER_BY_INDEX;

  constructor(
    public payload: { queueIndex: number; customerInQueueIndex: number }
  ) {}
}

export class startGetOrder implements Action {
  readonly type = START_GET_ORDER;

  constructor(public payload: { queueIndex: number; currentTime: number }) {}
}

export class endGetOrder implements Action {
  readonly type = END_GET_ORDER;

  constructor(public payload: number) {}
}

export class moveQueue implements Action {
  readonly type = MOVE_QUEUE;

  constructor(public payload: number) {}
}

export type ReceptionsActions =
  | startSimulation
  | addCustomerToQueue
  | removeCustomerByIndex
  | startGetOrder
  | endGetOrder
  | moveQueue;
