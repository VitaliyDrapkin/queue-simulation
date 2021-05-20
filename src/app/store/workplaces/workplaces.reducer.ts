import { Workplace } from "../../models/workplace-model";
import { prepareWorkplaces } from "./prepare-workplaces-reduce";
import { addOrderToProduction } from "./add-product-to-production.reduce";
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

    default: {
      return state;
    }
  }
}
