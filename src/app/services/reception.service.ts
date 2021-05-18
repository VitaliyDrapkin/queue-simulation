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

    this.removeEmptyQueuePlace(simulationState.receptions.receptions);
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
      this.store.dispatch(new ReceptionsActions.addCustomerToQueue());
    }
  }

  private startGetOrder(currentTime: number, receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (this.checkIfNeedToStartGetOrder(receptions[i])) {
        this.store.dispatch(
          new ReceptionsActions.startGetOrder({ queueIndex: i, currentTime })
        );
      }
    }
  }

  private checkIfNeedToStartGetOrder(reception: Reception): boolean {
    if (
      reception.customersInQueue.length &&
      reception.currentOccupation === "Empty" &&
      !reception.isHasCompletedCustomer
    ) {
      return true;
    }
    return false;
  }

  private endGetOrder(currentTime: number, receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (this.checkIfNeedToEndGetOrder(receptions[i], currentTime)) {
        this.store.dispatch(new ReceptionsActions.endGetOrder(i));
      }
    }
  }

  private checkIfNeedToEndGetOrder(
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

  private removeEmptyQueuePlace(receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (receptions[i].isHasCompletedCustomer) {
        this.store.dispatch(new ReceptionsActions.moveQueue(i));
      }
    }
  }
}
