import { Workplace } from "./../../models/workplace-model";
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

    case WorkplacesActions.ADD_ORDER_TO_WORKPLACE:
      const newWorkplaces: Workplace[] = [...state.workplaces].map(
        (workplace) => {
          if (workplace.id === action.payload.workplaceId) {
            return {
              ...workplace,
              isEmpty: false,
              order: action.payload.order,
            };
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
