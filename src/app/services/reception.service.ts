import { ReceptionStatuses } from "./../enums/ReceptionStatuses";
import { Reception } from "../models/reception.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";

@Injectable({
  providedIn: "root",
})
export class ReceptionService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMovies(appState: AppState) {
    this.addNewCustomer(
      appState.simulation.step,
      appState.receptions.lastCustomerInTime,
      appState.receptions.newCustomerFrequency,
      !!appState.receptions.newCustomers.length
    );

    this.startGetOrder(
      appState.simulation.step,
      appState.receptions.receptions
    );
    this.endGetOrder(
      appState.simulation.step,
      appState.receptions.receptions,
      appState.orders.orders
    );

    this.moveQueue(appState.receptions.receptions);
  }

  private addNewCustomer(
    currentTime: number,
    lastCustomerTime: number,
    newCustomerFrequency: number,
    isHasNewCustomers: boolean
  ) {
    if (
      isHasNewCustomers &&
      currentTime - lastCustomerTime >= newCustomerFrequency
    ) {
      this.store.dispatch(
        new ReceptionsActions.addCustomerToQueue({ currentTime })
      );
    }
  }

  private startGetOrder(currentTime: number, receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].customersInQueue.length &&
        receptions[i].currentOccupation === ReceptionStatuses.Empty &&
        !receptions[i].isHasCompletedCustomer
      ) {
        this.store.dispatch(
          new ReceptionsActions.startGetOrder({ queueIndex: i, currentTime })
        );
      }
    }
  }

  private endGetOrder(
    currentTime: number,
    receptions: Reception[],
    orders: Order[]
  ) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].currentOccupation === ReceptionStatuses.GettingOrder &&
        receptions[i].getOrderTime + receptions[i].startedGetOrderTime <=
          currentTime
      ) {
        const customerOrderId = receptions[i].customersInQueue[0].order.id;
        orders.forEach((order) => {
          if (order.id == customerOrderId) {
            this.store.dispatch(new ReceptionsActions.endGetOrder(i));
          }
        });
      }
    }
  }

  private moveQueue(receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].currentOccupation ===
        ReceptionStatuses.WaitingNextCustomer
      ) {
        this.store.dispatch(new ReceptionsActions.moveQueue(i));
      }
    }
  }
}
