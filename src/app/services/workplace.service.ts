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
      appState.simulation.currentTime
    );
    this.finishCreatingProduct(
      appState.workplaces.workplaces,
      appState.simulation.currentTime
    );
    this.finishCreatingOrder(
      appState.workplaces.workplaces,
      appState.simulation.currentTime
    );
  }

  private finishCreatingIngredient(
    workplaces: Workplace[],
    currentTime: number
  ) {
    workplaces.forEach((workplace, workplaceIndex) => {
      if (!workplace.order) {
        return;
      }

      const timePassOfStartCreating = currentTime - workplace.addedProductTime;

      let timeNeededForIngredient = 0;
      for (
        let ingredientIndex = 0;
        ingredientIndex <
        workplace.order.products[workplace.currentProductIndex].ingredients
          .length;
        ingredientIndex++
      ) {
        timeNeededForIngredient =
          timeNeededForIngredient +
          workplace.order.products[workplace.currentProductIndex].ingredients[
            ingredientIndex
          ].delayTime;
        if (
          !workplace.order.products[workplace.currentProductIndex].isCreated &&
          timeNeededForIngredient < timePassOfStartCreating
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

  finishCreatingProduct(workplaces: Workplace[], currentTime: number) {
    workplaces.forEach((workplace, index) => {
      if (
        workplace.order &&
        workplace.currentProductIndex !== workplace.order.products.length - 1
      ) {
        const currentProduct =
          workplace.order.products[workplace.currentProductIndex];
        if (
          (currentProduct.ingredients.length &&
            currentProduct.ingredients[currentProduct.ingredients.length - 1]
              .isCreated) ||
          (!currentProduct.ingredients.length &&
            workplace.addedProductTime + currentProduct.delayTime <=
              currentTime)
        ) {
          this.store.dispatch(
            new WorkplacesActions.FinishCreatingProduct({
              currentTime: currentTime,
              workplaceIndex: index,
            })
          );
        }
      }
    });
  }

  finishCreatingOrder(workplaces: Workplace[], currentTime: number) {
    workplaces.forEach((workplace, index) => {
      if (workplace.order) {
        if (
          workplace.currentProductIndex ===
          workplace.order.products.length - 1
        ) {
          const currentProduct =
            workplace.order.products[workplace.currentProductIndex];

          if (
            (currentProduct.ingredients.length &&
              currentProduct.ingredients[currentProduct.ingredients.length - 1]
                .isCreated) ||
            (!currentProduct.ingredients.length &&
              workplace.addedProductTime + currentProduct.delayTime <=
                currentTime)
          ) {
            this.store.dispatch(
              new WorkplacesActions.FinishCreatingOrder({
                workplaceIndex: index,
              })
            );
            this.store.dispatch(
              new OrdersActions.changeOrderStatus({
                status: OrderStatuses.WaitingForDelivery,
                orderId: workplace.order.id,
              })
            );
          }
        }
      }
    });
  }
}
