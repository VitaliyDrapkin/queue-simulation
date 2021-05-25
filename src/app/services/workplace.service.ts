import { FinishCreatingProduct } from "./../store/workplaces/workplaces.actions";
import { Workplace } from "../models/workplace-model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import * as WorkplacesActions from "../store/workplaces/workplaces.actions";
import * as OrdersActions from "../store/orders/orders.actions";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { OrderStatuses } from "../enums/OrderStatuses";

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
    this.finishCreatingProduct(
      appState.simulation.step,
      appState.workplaces.workplaces
    );
    this.finishCreatingOrder(appState.workplaces.workplaces);
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

  finishCreatingProduct(step: number, workplaces: Workplace[]) {
    workplaces.forEach((workplace, index) => {
      if (workplace.order) {
        const order = workplace.order;
        if (order.products.length - 1 !== workplace.currentProductIndex) {
          const currentProduct = order.products[workplace.currentProductIndex];
          if (
            currentProduct.ingredients.length &&
            currentProduct.ingredients[currentProduct.ingredients.length - 1]
              .isCreated
          ) {
            this.store.dispatch(
              new WorkplacesActions.FinishCreatingProduct({
                step: step,
                workplaceIndex: index,
              })
            );
          }
        }
      }
    });
  }
  finishCreatingOrder(workplaces: Workplace[]) {
    workplaces.forEach((workplace, index) => {
      if (workplace.order) {
        const lastProductInOrder =
          workplace.order.products[workplace.order.products.length - 1];
        console.log("index", index);
        console.log(lastProductInOrder.ingredients.length);
        if (
          (lastProductInOrder.ingredients.length &&
            lastProductInOrder.ingredients[
              lastProductInOrder.ingredients.length - 1
            ].isCreated) ||
          (lastProductInOrder.delayTime && lastProductInOrder.isCreated)
        ) {
          this.store.dispatch(
            new WorkplacesActions.FinishCreatingOrder({ workplaceIndex: index })
          );
          this.store.dispatch(
            new OrdersActions.changeOrderStatus({
              status: OrderStatuses.WaitingForDelivery,
              orderId: workplace.order.id,
            })
          );
        }
      }
    });
  }
}
