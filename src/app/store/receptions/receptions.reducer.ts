import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import * as ReceptionsActions from "./receptions.actions";

export interface State {
  isSimulationRun: boolean;
  step: number;
  lastCustomerInTime: number;
  newCustomers: Customer[];
  receptions: Reception[];
  newCustomerFrequency: number;
}

const initialState: State = {
  isSimulationRun: false,
  step: 0,
  lastCustomerInTime: 0,
  newCustomers: [],
  receptions: [],
  newCustomerFrequency: -1,
};

export function receptionsReducer(
  state = initialState,
  action: ReceptionsActions.ReceptionsActions
) {
  switch (action.type) {
    case ReceptionsActions.SET_INITIAL_DATA:
      return {
        ...state,
        step: 0,
        newCustomers: action.payload.customers,
        receptions: action.payload.receptions.map((item) => {
          return new Reception(
            1,
            action.payload.receptionsTypes[item].getOrderTime,
            [],
            "Empty"
          );
        }),
        newCustomerFrequency: action.payload.newCustomerFrequency,
      };

    case ReceptionsActions.MAKE_STEP:
      console.log("step " + state.step);
      return {
        ...state,
        step: state.step + 1,
      };

    case ReceptionsActions.ADD_CUSTOMER_TO_QUEUE:
      const newCustomer = new Customer(action.payload.id, action.payload.order);

      const smallestQueueIndex = state.receptions
        .map((item) => item.customersInQueue.length)
        .indexOf(
          Math.min.apply(
            Math,
            state.receptions.map((item) => item.customersInQueue.length)
          )
        );

      const newReceptions = [...state.receptions];
      newReceptions[smallestQueueIndex].customersInQueue = [
        ...newReceptions[smallestQueueIndex].customersInQueue,
        newCustomer,
      ];
      return {
        ...state,
        receptions: newReceptions,
      };

    default: {
      return state;
    }
  }
}
