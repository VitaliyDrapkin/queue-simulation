import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import * as ReceptionsActions from "./receptions.actions";
import { prepareReception } from "./prepare-receptions";

export interface State {
  lastCustomerInTime: number;
  newCustomers: Customer[];
  receptions: Reception[];
  newCustomerFrequency: number;
}

const initialState: State = {
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
    case ReceptionsActions.PREPARE_SIMULATION:
      const updatedState = prepareReception(state, action.payload);
      return updatedState;

    case ReceptionsActions.ADD_CUSTOMER_TO_QUEUE:
      console.log("[ReceptionsReducer]  addCustomerToQueue()");
      const updatedCustomers = [...state.newCustomers];
      const newCustomer = updatedCustomers.shift();

      const smallestQueueIndex = state.receptions
        .map((reception) => reception.customersInQueue.length)
        .indexOf(
          Math.min.apply(
            Math,
            state.receptions.map(
              (reception) => reception.customersInQueue.length
            )
          )
        );
      const updatedReception = [...state.receptions].map((reception) => {
        return {
          ...reception,
          customersInQueue: [...reception.customersInQueue],
        };
      });
      updatedReception[smallestQueueIndex].customersInQueue.push(newCustomer);

      return {
        ...state,
        receptions: updatedReception,
        newCustomers: updatedCustomers,
      };

    case ReceptionsActions.REMOVE_CUSTOMER_BY_INDEX:
      return {
        ...state,
        receptions: [...state.receptions].map((queue, index) => {
          if (index !== action.payload.queueIndex) {
            return queue;
          }
          const newQueue = { ...queue };
          newQueue.customersInQueue.splice(
            action.payload.customerInQueueIndex,
            1
          );
          return newQueue;
        }),
      };

    //changes the status of reception occupation and add start get order time
    case ReceptionsActions.START_GET_ORDER:
      console.log("[ReceptionsReducer]  startGetOrder()");
      return {
        ...state,
        receptions: state.receptions.map((reception, index) => {
          if (index === action.payload.queueIndex) {
            const updatedReception = { ...reception };
            updatedReception.currentOccupation = "Getting order";
            updatedReception.startedGetOrderTime = action.payload.currentTime;
            return updatedReception;
          }
          return reception;
        }),
      };

    //changes the status of reception occupation and remove customer from queue
    case ReceptionsActions.END_GET_ORDER:
      console.log("[ReceptionsReducer]  endGetOrder()");
      return {
        ...state,
        receptions: state.receptions.map((reception, index) => {
          if (index === action.payload) {
            const updatedReception = { ...reception };
            updatedReception.customersInQueue = [
              ...updatedReception.customersInQueue,
            ];
            updatedReception.customersInQueue.shift();
            updatedReception.isHasCompletedCustomer = true;
            updatedReception.currentOccupation = "Empty";
            updatedReception.startedGetOrderTime = -1;
            return updatedReception;
          }
          return reception;
        }),
      };

    case ReceptionsActions.MOVE_QUEUE:
      return {
        ...state,
        receptions: state.receptions.map((reception, index) => {
          if (index === action.payload) {
            const updatedReception = { ...reception };
            updatedReception.isHasCompletedCustomer = false;
            return updatedReception;
          }
          return reception;
        }),
      };
    default: {
      return state;
    }
  }
}
