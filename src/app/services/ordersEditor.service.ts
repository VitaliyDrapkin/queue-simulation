import { Ingredient } from "./../models/ingredient.model";
import { Simulation } from "./../models/simulation.model";
import { Product } from "./../models/product.model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class OrdersEditorService {
  isModalWindowOpen: boolean = false;
  isEditMode: boolean;
  productsInSimulation: Product[];
  productsCount: number[];
  constructor(public store: Store<fromApp.AppState>) {}

  prepareSimulation(scenario: Simulation) {
    this.productsInSimulation = scenario.products.map((product, index) => {
      const ingredients = product.ingredients.map((ingredient) => {
        return new Ingredient(
          scenario.ingredients[ingredient].id,
          scenario.ingredients[ingredient].name,
          scenario.ingredients[ingredient].image,
          scenario.ingredients[ingredient].delayTime
        );
      });
      return new Product(
        product.id,
        product.productName,
        product.image,
        ingredients
      );
    });
    this.productsCount = new Array(this.productsInSimulation.length).fill(0);
  }
  startEditOrder() {
    this.isModalWindowOpen = true;
    this.isEditMode = true;
  }
  startCreateOrder() {
    this.isModalWindowOpen = true;
    this.isEditMode = false;
  }

  closeModalWindow() {
    this.isModalWindowOpen = false;
  }

  save() {
    if (this.isEditMode) {
      this.editOrder();
    } else {
      this.addOrder();
    }
  }

  editOrder() {}

  addOrder() {}
}
