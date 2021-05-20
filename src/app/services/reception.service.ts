import { ReceptionStatuses } from "./../enums/ReceptionStatuses";
import { Reception } from "../models/reception.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ReceptionService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMovies(simulationState: AppState) {
    this.addNewCustomer(
      simulationState.simulation.step,
      simulationState.receptions.lastCustomerInTime,
      simulationState.receptions.newCustomerFrequency,
      !!simulationState.receptions.newCustomers.length
    );

    this.startGetOrder(
      simulationState.simulation.step,
      simulationState.receptions.receptions
    );
    this.endGetOrder(
      simulationState.simulation.step,
      simulationState.receptions.receptions
    );

    this.moveQueue(simulationState.receptions.receptions);
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

  private endGetOrder(currentTime: number, receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].currentOccupation === ReceptionStatuses.GettingOrder &&
        receptions[i].getOrderTime + receptions[i].startedGetOrderTime ===
          currentTime - 1
      ) {
        this.store.dispatch(new ReceptionsActions.endGetOrder(i));
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
