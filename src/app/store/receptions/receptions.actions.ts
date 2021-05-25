import { Ingredient } from "./../../models/ingredient.model";
import {
  scenarioProduct,
  scenarioCustomer,
  scenarioReception,
  scenarioReceptionType,
} from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@receptions/PREPARE_SIMULATION";
export const ADD_CUSTOMER_TO_QUEUE = "@@receptions/ADD_CUSTOMER_TO_QUEUE";
export const REMOVE_CUSTOMER_BY_INDEX = "@@receptions/REMOVE_CUSTOMER_BY_INDEX";
export const START_GET_ORDER = "@@receptions/START_GET_ORDER";
export const END_GET_ORDER = "@@receptions/END_GET_ORDER";
export const MOVE_QUEUE = "@@receptions/MOVE_QUEUE";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(
    public payload: {
      products: scenarioProduct[];
      customers: scenarioCustomer[];
      receptions: scenarioReception[];
      receptionTypes: scenarioReceptionType[];
      ingredients: Ingredient[];
      newCustomerFrequency: number;
    }
  ) {}
}

export class addCustomerToQueue implements Action {
  readonly type = ADD_CUSTOMER_TO_QUEUE;

  constructor(public payload: { currentTime: number }) {}
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
  | PrepareSimulation
  | addCustomerToQueue
  | removeCustomerByIndex
  | startGetOrder
  | endGetOrder
  | moveQueue;
