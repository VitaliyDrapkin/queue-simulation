import { Workplace } from "../../models/workplace-model";

export function addOrderToProduction(state, payload) {
  const newWorkplaces: Workplace[] = [...state.workplaces].map(
    (workplace): Workplace => {
      if (workplace.id === payload.workplaceId) {
        const updatedWorkplace = { ...workplace };
        updatedWorkplace.order = payload.order;
        updatedWorkplace.addedProductTime = payload.currentTime;
        updatedWorkplace.currentProductIndex = 0;
        return updatedWorkplace;
      }
      return workplace;
    }
  );
  return {
    ...state,
    workplaces: newWorkplaces,
  };
}
