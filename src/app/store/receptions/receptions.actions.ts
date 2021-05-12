import { Customer } from "./../../models/customer.model";
import { Action } from "@ngrx/store";

import { Simulation } from "./../../models/simulation.model";

export const SET_INITIAL_DATA = "Set initial data";
export const START_SIMULATION = "Start simulation";
export const PAUSE_SIMULATION = "Pause simulation";
export const MAKE_STEP = "Make a step";
export const ADD_CUSTOMER_TO_QUEUE = "[reception] Add customer to queue";
export const START_GET_ORDER = "[reception] Start get order";
export const END_GET_ORDER = "[reception] End get order";
export const MOVE_QUEUE = "[reception] Move queue";

export class startSimulation implements Action {
  readonly type = START_SIMULATION;
}

export class pauseSimulation implements Action {
  readonly type = PAUSE_SIMULATION;
}
export class setInitialData implements Action {
  readonly type = SET_INITIAL_DATA;

  constructor(public payload: Simulation) {}
}

export class makeStep implements Action {
  readonly type = MAKE_STEP;
}

export class addCustomerToQueue implements Action {
  readonly type = ADD_CUSTOMER_TO_QUEUE;

  constructor(public payload: Customer) {}
}

export type ReceptionsActions = setInitialData | makeStep | addCustomerToQueue;
