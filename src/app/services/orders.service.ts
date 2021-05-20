import * as OrdersActions from "./../store/orders/orders.actions";
import { Reception } from "./../models/reception.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { ReceptionStatuses } from "../enums/ReceptionStatuses";

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
      if (
        receptions[i].currentOccupation === ReceptionStatuses.GettingOrder &&
        receptions[i].getOrderTime + receptions[i].startedGetOrderTime ===
          currentTime - 1
      ) {
        this.store.dispatch(
          new OrdersActions.addOrder(receptions[i].customersInQueue[0].order)
        );
      }
    }
  }
}
