import * as OrdersActions from "./../store/orders/orders.actions";
import { Reception } from "./../models/reception.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMovies(simulationState: AppState) {
    this.addNewOrders(
      simulationState.receptions.receptions,
      simulationState.simulation.step
    );
  }

  private addNewOrders(receptions: Reception[], currentTime: number) {
    for (let i = 0; i < receptions.length; i++) {
      if (this.checkIfNeedToAddOrder(receptions[i], currentTime)) {
        this.store.dispatch(
          new OrdersActions.addOrder(receptions[i].customersInQueue[0].order)
        );
      }
    }
  }

  private checkIfNeedToAddOrder(
    reception: Reception,
    currentTime: number
  ): boolean {
    if (
      reception.currentOccupation === "Getting order" &&
      reception.getOrderTime + reception.startedGetOrderTime === currentTime - 1
    ) {
      return true;
    }
    return false;
  }
}
