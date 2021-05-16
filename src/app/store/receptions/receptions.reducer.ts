import { Product } from "./../../models/product.model";
import { Ingredient } from "./../../models/ingredient.model";
import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import * as ReceptionsActions from "./receptions.actions";
import { Order } from "src/app/models/order.model";

export interface State {
  lastCustomerInTime: number;
  newCustomers: Customer[];
  receptions: Reception[];
  newCustomerFrequency: number;
  // products: Product[];
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
    case ReceptionsActions.START_SIMULATION:
      const allProducts: Product[] = action.payload.products.map((item) => {
        const productIngredients = item.ingredients.map((item) => {
          return new Ingredient(
            action.payload.ingredients[item].id,
            action.payload.ingredients[item].name,
            action.payload.ingredients[item].image,
            action.payload.ingredients[item].cookingTime
          );
        });
        return new Product(
          item.id,
          item.productName,
          item.image,
          productIngredients
        );
      });

      const newCustomers: Customer[] = action.payload.customers.map((item) => {
        const products: Product[] = item.order.products.map((item) => {
          return allProducts[item];
        });

        return new Customer(item.id, new Order(item.order.id, products));
      });
      const receptions = action.payload.receptions.map((item) => {
        return new Reception(
          item.id,
          action.payload.receptionTypes[item.receptionType].getOrderTime,
          -1,
          [],
          false,
          "Empty"
        );
      });
      return {
        ...state,
        newCustomers: newCustomers,
        receptions: receptions,
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
        receptions: state.receptions.map((item, index) => {
          if (index === action.queueIndex) {
            const cloneItem = { ...item };
            cloneItem.currentOccupation = "Getting order";
            cloneItem.startedGetOrderTime = action.currentTime;
            return cloneItem;
          }
          return item;
        }),
      };

    case ReceptionsActions.END_GET_ORDER:
      return {
        ...state,
        receptions: state.receptions.map((item, index) => {
          if (index === action.queueIndex) {
            const cloneItem = { ...item };
            cloneItem.customersInQueue = [...cloneItem.customersInQueue];
            cloneItem.customersInQueue.shift();
            cloneItem.isHasCompletedCustomer = true;
            cloneItem.currentOccupation = "Empty";
            cloneItem.startedGetOrderTime = -1;
            return cloneItem;
          }
          return item;
        }),
      };

    case ReceptionsActions.MOVE_QUEUE:
      return {
        ...state,
        receptions: state.receptions.map((item, index) => {
          if (index === action.queueIndex) {
            const cloneItem = { ...item };
            cloneItem.isHasCompletedCustomer = false;
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
