import {
  scenarioProduct,
  scenarioCustomer,
  scenarioReception,
  scenarioReceptionType,
} from "./../../models/simulation.model";
import { ReceptionStatuses } from "./../../enums/ReceptionStatuses";
import { Reception } from "./../../models/reception.model";
import { Order } from "src/app/models/order.model";
import { Customer } from "./../../models/customer.model";
import { Ingredient } from "./../../models/ingredient.model";
import { Product } from "./../../models/product.model";

interface payload {
  products: scenarioProduct[];
  ingredients: Ingredient[];
  customers: scenarioCustomer[];
  receptions: scenarioReception[];
  receptionTypes: scenarioReceptionType[];
  newCustomerFrequency: number;
}

export function prepareReception(state, payload: payload) {
  const allProducts: Product[] = payload.products.map((product) => {
    const productIngredients = product.ingredients.map((ingredient) => {
      return new Ingredient(
        payload.ingredients[ingredient].id,
        payload.ingredients[ingredient].name,
        payload.ingredients[ingredient].image,
        payload.ingredients[ingredient].delayTime
      );
    });
    return new Product(
      product.id,
      product.productName,
      product.image,
      productIngredients,
      product.delayTime
    );
  });

  const newCustomers: Customer[] = payload.customers.map((customer) => {
    const products: Product[] = customer.order.products.map((product) => {
      return allProducts[product];
    });

    return new Customer(customer.id, new Order(customer.order.id, products));
  });
  const receptions = payload.receptions.map((reception) => {
    const getOrderTime = payload.receptionTypes.filter(
      (receptionType) => reception.receptionTypeId === receptionType.id
    )[0].getOrderTime;

    return new Reception(
      reception.id,
      0,
      getOrderTime,
      [],
      false,
      ReceptionStatuses.Empty
    );
  });
  return {
    ...state,
    newCustomers: newCustomers,
    receptions: receptions,
    newCustomerFrequency: payload.newCustomerFrequency,
  };
}
