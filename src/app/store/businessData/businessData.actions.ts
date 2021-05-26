import { Ingredient } from "./../../models/ingredient.model";
import { scenarioProduct } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@businessData/PREPARE_SIMULATION";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(
    public payload: {
      products: scenarioProduct[];
      ingredients: Ingredient[];
    }
  ) {}
}

export type BusinessDataActions = PrepareSimulation;
