import { ReceptionStatuses } from "src/app/enums/ReceptionStatuses";
export function moveQueue(state, payload) {
  return {
    ...state,
    receptions: state.receptions.map((reception, index) => {
      if (index === payload) {
        const updatedReception = { ...reception };
        updatedReception.currentOccupation = ReceptionStatuses.Empty;
        return updatedReception;
      }
      return reception;
    }),
  };
}
