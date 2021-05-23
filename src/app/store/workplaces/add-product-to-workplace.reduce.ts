import { Workplace } from "../../models/workplace-model";

export function addOrderToProduction(state, payload) {
  const newWorkplaces: Workplace[] = [...state.workplaces].map(
    (workplace): Workplace => {
      if (workplace.id === payload.workplaceId) {
        const updatedWorkplace = { ...workplace };
        updatedWorkplace.isEmpty = false;
        updatedWorkplace.orderId = payload.orderId;
        updatedWorkplace.product = payload.product;
        updatedWorkplace.addedProductTime = payload.currentTime;
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
