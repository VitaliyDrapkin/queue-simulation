import { Customer } from "./../../models/customer.model";
import { Reception } from "./../../models/reception.model";
import { ReceptionStatuses } from "src/app/enums/ReceptionStatuses";
import { Ingredient } from "./../../models/ingredient.model";
import { Product } from "./../../models/product.model";
import * as BusinessDataActions from "./businessData.actions";
import { Order } from "src/app/models/order.model";
import { OrderStatuses } from "src/app/enums/OrderStatuses";

export interface State {
  products: Product[];
  ingredients: Ingredient[];
  orderEditorProducts: Product[];
}

const initialState: State = {
  products: [],
  ingredients: [],
  orderEditorProducts: [],
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

      const productsEditorCounter = new Array(products.length).fill(0);

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
        productsEditorCounter: productsEditorCounter,
      };

    case BusinessDataActions.ADD_SELECTED_PRODUCT_TO_ORDER_EDITOR:
      const newProduct = {
        ...state.products.find(
          (product) => product.id === action.payload.productId
        ),
      };

      const updatedEditorProducts = [...state.orderEditorProducts, newProduct];
      return {
        ...state,
        orderEditorProducts: updatedEditorProducts,
      };

    case BusinessDataActions.REMOVE_SELECTED_PRODUCT_FROM_ORDER_EDITOR:
      const updatedRemovedProducts = [...state.orderEditorProducts];
      for (let i = 0; i < updatedRemovedProducts.length; i++) {
        if (updatedRemovedProducts[i].id == action.payload.productId) {
          updatedRemovedProducts.splice(i, 1);
          break;
        }
      }

      return {
        ...state,
        orderEditorProducts: updatedRemovedProducts,
      };

    default: {
      return state;
    }
  }
}
