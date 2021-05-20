import { Workplace } from "../../models/workplace-model";
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
      const workplaces: Workplace[] = [];
      for (let i = 0; i < action.payload.workplaces; i++) {
        const newWorkPlace = new Workplace(i + 1, true);
        workplaces.push(newWorkPlace);
      }
      return {
        ...state,
        workplaces: workplaces,
      };

    case WorkplacesActions.ADD_PRODUCT_TO_WORKPLACE:
      const newWorkplaces: Workplace[] = [...state.workplaces].map(
        (workplace): Workplace => {
          if (workplace.id === action.payload.workplaceId) {
            const updatedWorkplace = { ...workplace };
            updatedWorkplace.isEmpty = false;
            updatedWorkplace.orderId = action.payload.orderId;
            updatedWorkplace.product = action.payload.product;
            updatedWorkplace.addedProductTime = action.payload.currentTime;
            return updatedWorkplace;
          }
          return workplace;
        }
      );
      return {
        ...state,
        workplaces: newWorkplaces,
      };

    default: {
      return state;
    }
  }
}
