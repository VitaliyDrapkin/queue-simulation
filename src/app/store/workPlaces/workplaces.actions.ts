import { Product } from "./../../models/product.model";
import { Simulation } from "../../models/simulation.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@workplaces/PREPARE_SIMULATION";
export const ADD_PRODUCT_TO_WORKPLACE = "@@workplaces/ADD_PRODUCT_TO_WORKPLACE";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;

  constructor(public payload: Simulation) {}
}

export class AddOrderToWorkplace implements Action {
  readonly type = ADD_PRODUCT_TO_WORKPLACE;

  constructor(
    public payload: {
      product: Product;
      orderId: number;
      workplaceId: number;
      currentTime: number;
    }
  ) {}
}

export type WorkplacesActions = PrepareSimulation | AddOrderToWorkplace;
