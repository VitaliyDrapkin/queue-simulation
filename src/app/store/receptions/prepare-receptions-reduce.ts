import { ReceptionStatuses } from "./../../enums/ReceptionStatuses";
import { Reception } from "./../../models/reception.model";
import { Order } from "src/app/models/order.model";
import { Customer } from "./../../models/customer.model";
import { Ingredient } from "./../../models/ingredient.model";
import { Product } from "./../../models/product.model";

export function prepareReception(state, payload) {
  const allProducts: Product[] = payload.products.map((product) => {
    const productIngredients = product.ingredients.map((ingredient) => {
      return new Ingredient(
        payload.ingredients[ingredient].id,
        payload.ingredients[ingredient].name,
        payload.ingredients[ingredient].image,
        payload.ingredients[ingredient].cookingTime
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
    return new Reception(
      reception.id,
      payload.receptionTypes[reception.receptionType].getOrderTime,
      -1,
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
