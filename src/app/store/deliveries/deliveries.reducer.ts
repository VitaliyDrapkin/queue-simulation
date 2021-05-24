import { Delivery } from "./../../models/delivery.model";
import * as DeliveriesActions from "./deliveries.actions";

export interface State {
  deliveries: Delivery[];
}

const initialState: State = {
  deliveries: [],
};

export function deliveriesReducer(
  state = initialState,
  action: DeliveriesActions.DeliveriesActions
) {
  switch (action.type) {
    case DeliveriesActions.PREPARE_SIMULATION:
      const deliveries = [];
      for (let i = 0; i < action.payload.delivers; i++) {
        const newDelivery = new Delivery(i + 1, -1);
        deliveries.push(newDelivery);
      }
      return { ...state, deliveries: deliveries };

    case DeliveriesActions.ADD_ORDER_TO_DELIVERY:
      return {
        ...state,
        deliveries: [...state.deliveries].map((delivery) => {
          if (delivery.id === action.payload.deliveryId) {
            return {
              ...delivery,
              order: action.payload.order,
              deliveryStartTime: action.payload.currentTime,
            };
          }
          return delivery;
        }),
      };
    case DeliveriesActions.REMOVE_ORDER_FROM_DELIVERY:
      return {
        ...state,
        deliveries: [...state.deliveries].map((delivery, index) => {
          if (index === action.payload.deliveryIndex) {
            return { ...delivery, order: null, deliveryStartTime: -1 };
          }
          return delivery;
        }),
      };

    default: {
      return state;
    }
  }
}
