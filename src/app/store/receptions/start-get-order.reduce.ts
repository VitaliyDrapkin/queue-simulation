import { ReceptionStatuses } from "src/app/enums/ReceptionStatuses";
export function startGetOrder(state, payload) {
  return {
    ...state,
    receptions: state.receptions.map((reception, index) => {
      if (index === payload.queueIndex) {
        const updatedReception = { ...reception };
        updatedReception.currentOccupation = ReceptionStatuses.GettingOrder;
        updatedReception.startedGetOrderTime = payload.currentTime;
        return updatedReception;
      }
      return reception;
    }),
  };
}
