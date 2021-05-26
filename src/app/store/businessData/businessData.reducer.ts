import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import { ReceptionStatuses } from "src/app/enums/ReceptionStatuses";
import { Ingredient } from "./../../models/ingredient.model";
import { Product } from "./../../models/product.model";
import * as BusinessDataActions from "./businessData.actions";
import { Order } from "src/app/models/order.model";

export interface State {
  products: Product[];
  ingredients: Ingredient[];
}

const initialState: State = {
  products: [],
  ingredients: [],
};

export function businessDataReducer(
  state = initialState,
  action: BusinessDataActions.BusinessDataActions
) {
  switch (action.type) {
    case BusinessDataActions.PREPARE_SIMULATION:
      const products: Product[] = action.payload.products.map((product) => {
        const productIngredients = product.ingredients.map((ingredient) => {
          return new Ingredient(
            action.payload.ingredients[ingredient].id,
            action.payload.ingredients[ingredient].name,
            action.payload.ingredients[ingredient].image,
            action.payload.ingredients[ingredient].delayTime
          );
        });
        return new Product(
          product.id,
          product.productName,
          product.image,
          productIngredients
        );
      });

      const ingredients: Ingredient[] = action.payload.ingredients.map(
        (ingredient) => {
          return new Ingredient(
            ingredient.id,
            ingredient.name,
            ingredient.image,
            ingredient.delayTime
          );
        }
      );

      return {
        ...state,
        products: products,
        ingredients: ingredients,
      };

    default: {
      return state;
    }
  }
}
