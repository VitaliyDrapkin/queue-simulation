import * as OrdersActions from "./orders.actions";
import * as WorkplacesActions from "../workplaces/workplaces.actions";
import * as DeliveriesActions from "../deliveries/deliveries.actions";
import { Order } from "src/app/models/order.model";

export interface State {
  orders: Order[];
}

const initialState: State = {
  orders: [],
};

export function ordersReducer(
  state = initialState,
  action:
    | OrdersActions.OrdersActions
    | WorkplacesActions.WorkplacesActions
    | DeliveriesActions.DeliveriesActions
) {
  switch (action.type) {
    case OrdersActions.PREPARE_SIMULATION:
      return {
        ...state,
        orders: [],
      };
    case OrdersActions.ADD_NEW_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
      };

    case OrdersActions.EDIT_ORDER:
      const editedOrders = [...state.orders].map((order) => {
        if (order.id === action.payload.editedOrderId) {
          return action.payload.newOrder;
        }
        return order;
      });
      return {
        ...state,
        orders: editedOrders,
      };

    case WorkplacesActions.ADD_PRODUCT_TO_WORKPLACE:
      return {
        ...state,
        orders: [...state.orders].map((order) => {
          return order.id === action.payload.order.id
            ? { ...order, status: action.payload.status }
            : order;
        }),
      };

    case DeliveriesActions.ADD_ORDER_TO_DELIVERY:
      return {
        ...state,
        orders: [...state.orders].map((order) => {
          return order.id === action.payload.order.id
            ? { ...order, status: action.payload.status }
            : order;
        }),
      };
    case OrdersActions.CHANGE_ORDER_STATUS:
      return {
        ...state,
        orders: [...state.orders].map((order) => {
          return order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order;
        }),
      };
    default: {
      return state;
    }
  }
}
