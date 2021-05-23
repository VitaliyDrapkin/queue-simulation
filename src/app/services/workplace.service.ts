import { Ingredient } from "./../models/ingredient.model";
import { Workplace } from "../models/workplace-model";
import { OrderStatuses } from "./../enums/OrderStatuses";
import { Product } from "./../models/product.model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Order } from "./../models/order.model";
import * as WorkplacesActions from "../store/workplaces/workplaces.actions";
import * as OrdersActions from "../store/orders/orders.actions";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class WorkplaceService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMoves(appState: AppState) {
    this.finishCreatingIngredient(
      appState.workplaces.workplaces,
      appState.simulation.step
    );
  }

  private finishCreatingIngredient(workplaces: Workplace[], step: number) {
    workplaces.forEach((workplace) => {
      if (!workplace.orderId) {
        return;
      }

      const timePassOfStartCreating = step - workplace.addedProductTime;

      let timeForCreatingIngredient = 0;
      for (let i = 0; i < workplace.product.ingredients.length; i++) {
        timeForCreatingIngredient =
          timeForCreatingIngredient +
          workplace.product.ingredients[i].creatingTime;
        if (
          !workplace.product.ingredients[i].isCreated &&
          timeForCreatingIngredient < timePassOfStartCreating
        ) {
          console.log("Ingredient Created");
        }
      }
    });
  }
}
