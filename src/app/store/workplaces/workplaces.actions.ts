import { OrderStatuses } from "src/app/enums/OrderStatuses";
import { Order } from "src/app/models/order.model";
import { Product } from "./../../models/product.model";
import { Scenario } from "../../models/Scenario.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@workplaces/PREPARE_SIMULATION";
export const ADD_PRODUCT_TO_WORKPLACE = "@@workplaces/ADD_PRODUCT_TO_WORKPLACE";
export const FINISH_CREATING_INGREDIENT =
  "@@workplaces/FINISH_CREATING_INGREDIENT";
export const FINISH_CREATING_PRODUCT = "@@workplaces/FINISH_CREATING_PRODUCT";
export const FINISH_CREATING_ORDER = "@@workplaces/FINISH_CREATING_ORDER";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;

  constructor(public payload: { workplaces: number }) {}
}

export class AddOrderToWorkplace implements Action {
  readonly type = ADD_PRODUCT_TO_WORKPLACE;

  constructor(
    public payload: {
      order: Order;
      workplaceId: number;
      currentTime: number;
      status: OrderStatuses;
    }
  ) {}
}
export class FinishCreatingIngredient implements Action {
  readonly type = FINISH_CREATING_INGREDIENT;

  constructor(
    public payload: {
      WorkplaceIndex: number;
      productIndex: number;
      ingredientIndex: number;
    }
  ) {}
}

export class FinishCreatingProduct implements Action {
  readonly type = FINISH_CREATING_PRODUCT;

  constructor(
    public payload: {
      currentTime: number;
      workplaceIndex: number;
    }
  ) {}
}
export class FinishCreatingOrder implements Action {
  readonly type = FINISH_CREATING_ORDER;

  constructor(
    public payload: {
      workplaceIndex: number;
    }
  ) {}
}

export type WorkplacesActions =
  | PrepareSimulation
  | AddOrderToWorkplace
  | FinishCreatingIngredient
  | FinishCreatingProduct
  | FinishCreatingOrder;
