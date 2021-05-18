import * as OrdersActions from "./orders.actions";
import { Order } from "src/app/models/order.model";

export interface State {
  orders: Order[];
}

const initialState: State = {
  orders: [],
};

export function ordersReducer(
  state = initialState,
  action: OrdersActions.OrdersActions
) {
  switch (action.type) {
    case OrdersActions.PREPARE_SIMULATION:
      return {
        ...state,
        orders: [],
      };
    case OrdersActions.ADD_NEW_ORDER:
      console.log("[OrderReducer]  addNewOrder()", action.order);
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    default: {
      return state;
    }
  }
}
