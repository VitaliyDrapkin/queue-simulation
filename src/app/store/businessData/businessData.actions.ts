import { Ingredient } from "./../../models/ingredient.model";
import { scenarioProduct } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@businessData/PREPARE_SIMULATION";
export const ADD_SELECTED_PRODUCT_TO_ORDER_EDITOR =
  "@@businessData/ADD_SELECTED_PRODUCT_TO_ORDER_EDITOR";
export const REMOVE_SELECTED_PRODUCT_FROM_ORDER_EDITOR =
  "@@businessData/REMOVE_SELECTED_PRODUCT_FROM_ORDER_EDITOR";

export const SAVE_EDITOR = "@@businessData/SAVE_EDITOR";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(
    public payload: {
      products: scenarioProduct[];
      ingredients: Ingredient[];
    }
  ) {}
}

export class addProductToSelected implements Action {
  readonly type = ADD_SELECTED_PRODUCT_TO_ORDER_EDITOR;
  constructor(
    public payload: {
      productId: number;
    }
  ) {}
}

export class RemoveSelectedProductFromOrderEditor implements Action {
  readonly type = REMOVE_SELECTED_PRODUCT_FROM_ORDER_EDITOR;
  constructor(
    public payload: {
      productId: number;
    }
  ) {}
}

export type BusinessDataActions =
  | PrepareSimulation
  | addProductToSelected
  | RemoveSelectedProductFromOrderEditor;
