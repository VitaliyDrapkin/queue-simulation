import { Product } from "./../../models/product.model";
import { Workplace } from "../../models/workplace-model";
import { prepareWorkplaces } from "./prepare-workplaces-reduce";
import { addOrderToProduction } from "./add-product-to-workplace.reduce";
import * as WorkplacesActions from "./workplaces.actions";

export interface State {
  workplaces: Workplace[];
}

const initialState: State = {
  workplaces: [],
};

export function workplacesReducer(
  state = initialState,
  action: WorkplacesActions.WorkplacesActions
) {
  switch (action.type) {
    case WorkplacesActions.PREPARE_SIMULATION:
      return prepareWorkplaces(state, action.payload);

    case WorkplacesActions.ADD_PRODUCT_TO_WORKPLACE:
      return addOrderToProduction(state, action.payload);

    case WorkplacesActions.FINISH_CREATING_INGREDIENT:
      const updatedWorkplaces = JSON.parse(JSON.stringify(state.workplaces));
      updatedWorkplaces[action.payload.WorkplaceIndex].order.products[
        action.payload.productIndex
      ].ingredients[action.payload.ingredientIndex].isCreated = true;

      return {
        ...state,
        workplaces: updatedWorkplaces,
      };

    case WorkplacesActions.FINISH_CREATING_PRODUCT:
      return {
        ...state,
        workplaces: [...state.workplaces].map((workplace, index) => {
          if (index === action.payload.workplaceIndex) {
            return {
              ...workplace,
              addedProductTime: action.payload.step,
              currentProductIndex: workplace.currentProductIndex + 1,
            };
          }
          return workplace;
        }),
      };

    case WorkplacesActions.FINISH_CREATING_ORDER:
      return {
        ...state,
        workplaces: [...state.workplaces].map((workplace, index) => {
          if (index === action.payload.workplaceIndex) {
            return {
              ...workplace,
              order: null,
              addedProductTime: -1,
              currentProductIndex: -1,
            };
          }
          return workplace;
        }),
      };

    default: {
      return state;
    }
  }
}
