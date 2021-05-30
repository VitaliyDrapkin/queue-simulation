import { Customer } from "./../../models/Customer.model";
import { Reception } from "./../../models/reception.model";
import * as ReceptionsActions from "./receptions.actions";
import { prepareReception } from "./prepare-receptions-reduce";
import { addCustomerToQueue } from "./add-customer-to-queue.reduce";
import { removeCustomerByIndex } from "./remove-customer.reduce";
import { startGetOrder } from "./start-get-order.reduce";
import { endGetOrder } from "./end-get-order.reduce";
import { moveQueue } from "./move-queue.reduce";

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
      return removeCustomerByIndex(state, action.payload);

    //changes the status of reception occupation and add start get order time
    case ReceptionsActions.START_GET_ORDER:
      return startGetOrder(state, action.payload);

    //changes the status of reception occupation and remove customer from queue
    case ReceptionsActions.END_GET_ORDER:
      return endGetOrder(state, action.payload);

    case ReceptionsActions.MOVE_QUEUE:
      return moveQueue(state, action.payload);
    default: {
      return state;
    }
  }
}
