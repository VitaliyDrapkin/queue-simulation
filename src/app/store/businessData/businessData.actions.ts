import { Ingredient } from "./../../models/ingredient.model";
import { scenarioProduct } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

export const PREPARE_SIMULATION = "@@businessData/PREPARE_SIMULATION";
export const START_CREATE_ORDER = "@@businessData/START_CREATE_ORDER";
export const START_EDIT_ORDER = "@@businessData/START_EDIT_ORDER";
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

export class startCreateOrder implements Action {
  readonly type = START_CREATE_ORDER;
  constructor() {}
}

export class startEditOrder implements Action {
  readonly type = START_EDIT_ORDER;
  constructor(
    public payload: { orderProducts: Product[]; editOrderId: number }
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
  | RemoveSelectedProductFromOrderEditor
  | startCreateOrder
  | startEditOrder;
