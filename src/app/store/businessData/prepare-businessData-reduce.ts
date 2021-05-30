import { Ingredient } from "./../../models/ingredient.model";

import { Product } from "src/app/models/product.model";

export function prepareBusinessData(state, payload) {
  const products: Product[] = payload.products.map((product) => {
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
      productIngredients
    );
  });

  const productsEditorCounter = new Array(products.length).fill(0);

  const ingredients: Ingredient[] = payload.ingredients.map((ingredient) => {
    return new Ingredient(
      ingredient.id,
      ingredient.name,
      ingredient.image,
      ingredient.delayTime
    );
  });

  return {
    ...state,
    products: products,
    ingredients: ingredients,
    productsEditorCounter: productsEditorCounter,
  };
}
