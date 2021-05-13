import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import * as ReceptionsActions from "./receptions.actions";

export interface State {
  lastCustomerInTime: number;
  newCustomers: Customer[];
  receptions: Reception[];
  newCustomerFrequency: number;
}

const initialState: State = {
  lastCustomerInTime: 0,
  newCustomers: [
    new Customer(1),
    new Customer(2),
    new Customer(3),
    new Customer(4),
    new Customer(5),
    new Customer(6),
    new Customer(7),
    new Customer(8),
    new Customer(9),
    new Customer(10),
  ],
  receptions: [
    new Reception(1, 2, [], "Empty"),
    new Reception(2, 2, [], "Empty"),
    new Reception(2, 2, [], "Empty"),
  ],
  newCustomerFrequency: 2,
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

    case ReceptionsActions.ADD_CUSTOMER_TO_QUEUE:
      const cloneCustomers = [...state.newCustomers];
      const newCustomer = cloneCustomers.shift();

      const smallestQueueIndex = state.receptions
        .map((item) => item.customersInQueue.length)
        .indexOf(
          Math.min.apply(
            Math,
            state.receptions.map((item) => item.customersInQueue.length)
          )
        );

      const cloneReceptions = JSON.parse(JSON.stringify(state.receptions));
      cloneReceptions[smallestQueueIndex].customersInQueue.push(newCustomer);

      return {
        ...state,
        receptions: cloneReceptions,
        newCustomers: cloneCustomers,
      };

    case ReceptionsActions.REMOVE_CUSTOMER_BY_INDEX:
      return {
        ...state,
        receptions: [...state.receptions].map((queue, index) => {
          if (index !== action.queueIndex) {
            return queue;
          }
          const newQueue = { ...queue };
          newQueue.customersInQueue.splice(action.customerInQueueIndex, 1);
          return newQueue;
        }),
      };

    case ReceptionsActions.START_GET_ORDER:
      return {
        ...state,
        receptions: state.receptions.map((item) => {
          if (item.id === action.queueIndex) {
            const cloneItem = { ...item };
            cloneItem.currentOccupation = "Getting order";
            return cloneItem;
          }
          return item;
        }),
      };

    case ReceptionsActions.END_GET_ORDER:
      return {
        ...state,
        receptions: state.receptions.map((item) => {
          if (item.id === action.queueIndex) {
            const cloneItem = { ...item };
            cloneItem.currentOccupation = "Empty";
            return cloneItem;
          }
          return item;
        }),
      };

    default: {
      return state;
    }
  }
}
