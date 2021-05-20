import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import * as ReceptionsActions from "./receptions.actions";
import { prepareReception } from "./prepare-receptions";
import { addCustomerToQueue } from "./addCustomerToQueue";
import { ReceptionStatuses } from "src/app/enums/ReceptionStatuses";

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
      return prepareReception(state, action.payload);

    case ReceptionsActions.ADD_CUSTOMER_TO_QUEUE:
      return addCustomerToQueue(state, action.payload);

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
      return {
        ...state,
        receptions: state.receptions.map((reception, index) => {
          if (index === action.payload.queueIndex) {
            const updatedReception = { ...reception };
            updatedReception.currentOccupation = ReceptionStatuses.GettingOrder;
            updatedReception.startedGetOrderTime = action.payload.currentTime;
            return updatedReception;
          }
          return reception;
        }),
      };

    //changes the status of reception occupation and remove customer from queue
    case ReceptionsActions.END_GET_ORDER:
      return {
        ...state,
        receptions: state.receptions.map((reception, index) => {
          if (index === action.payload) {
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

    case ReceptionsActions.MOVE_QUEUE:
      return {
        ...state,
        receptions: state.receptions.map((reception, index) => {
          if (index === action.payload) {
            const updatedReception = { ...reception };
            updatedReception.currentOccupation = ReceptionStatuses.Empty;
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
