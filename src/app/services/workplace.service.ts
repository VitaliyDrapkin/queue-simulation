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
    this.finishCreatedOrder(appState.workplaces.workplaces);
  }

  private finishCreatingIngredient(workplaces: Workplace[], step: number) {
    workplaces.forEach((workplace, workplaceIndex) => {
      if (!workplace.order) {
        return;
      }
      const timePassOfStartCreating = step - workplace.addedProductTime;

      let timeForIngredient = 0;
      for (
        let ingredientIndex = 0;
        ingredientIndex <
        workplace.order.products[workplace.currentProductIndex].ingredients
          .length;
        ingredientIndex++
      ) {
        timeForIngredient =
          timeForIngredient +
          workplace.order.products[workplace.currentProductIndex].ingredients[
            ingredientIndex
          ].creatingTime;
        if (
          !workplace.order.products[workplace.currentProductIndex].isCreated &&
          timeForIngredient < timePassOfStartCreating
        ) {
          this.store.dispatch(
            new WorkplacesActions.FinishCreatingIngredient({
              WorkplaceIndex: workplaceIndex,
              productIndex: workplace.currentProductIndex,
              ingredientIndex: ingredientIndex,
            })
          );
        }
      }
    });
  }

  finishCreatedOrder(workplaces: Workplace[]) {
    // workplaces.forEach((workplace) => {
    //   if (
    //     workplace.order &&
    //     workplace.order.products[workplace.order.products.length - 1]
    //       .ingredients[2].isCreated
    //   ) {
    //     console.log("Order Created");
    //   }
    // });
  }
}
