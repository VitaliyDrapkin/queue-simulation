import { ReceptionStatuses } from "src/app/enums/ReceptionStatuses";
export function endGetOrder(state, payload) {
  return {
    ...state,
    receptions: state.receptions.map((reception, index) => {
      if (index === payload) {
        const updatedReception = { ...reception };
        updatedReception.customersInQueue = [
          ...updatedReception.customersInQueue,
        ];
        updatedReception.customersInQueue.shift();
        updatedReception.currentOccupation =
          ReceptionStatuses.WaitingNextCustomer;
        updatedReception.startedGetOrderTime = -1;
        return updatedReception;
      }
      return reception;
    }),
  };
}
