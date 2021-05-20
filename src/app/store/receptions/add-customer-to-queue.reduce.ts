import { Reception } from "../../models/reception.model";
import { ReceptionStatuses } from "../../enums/ReceptionStatuses";
import { Order } from "src/app/models/order.model";
import { Customer } from "../../models/customer.model";
import { Ingredient } from "../../models/ingredient.model";
import { Product } from "../../models/product.model";

export function addCustomerToQueue(state, payload) {
  const updatedCustomers = [...state.newCustomers];
  const newCustomer = updatedCustomers.shift();

  let smallestQueueIndex = getSmallestQueueIndex(state.receptions);

  const updatedReceptions = [...state.receptions].map((reception) => {
    return {
      ...reception,
      customersInQueue: [...reception.customersInQueue],
    };
  });
  updatedReceptions[smallestQueueIndex].customersInQueue.push(newCustomer);

  return {
    ...state,
    receptions: updatedReceptions,
    newCustomers: updatedCustomers,
    lastCustomerInTime: payload.currentTime,
  };
}

function getSmallestQueueIndex(receptions: Reception[]) {
  let smallestQueueIndex = -1;
  let queueCustomersLength: number;

  for (let i = 0; i < receptions.length; i++) {
    if (
      receptions[i].customersInQueue.length < queueCustomersLength ||
      smallestQueueIndex === -1
    ) {
      smallestQueueIndex = i;
      queueCustomersLength = receptions[i].customersInQueue.length;
    }
  }
  return smallestQueueIndex;
}
