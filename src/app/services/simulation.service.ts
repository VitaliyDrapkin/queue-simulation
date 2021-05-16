import { Reception } from "./../models/reception.model";
import { Customer } from "./../models/customer.model";
import { AppState } from "./../store/app.reducer";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  constructor(public store: Store<fromApp.AppState>) {}

  startSimulation(jsonSimulation: string) {
    this.store.dispatch(
      new SimulationActions.startSimulation(JSON.parse(jsonSimulation))
    );
  }

  stopSimulation() {}

  checkSimulationMoves(simulationState: AppState) {
    this.newCustomerLogic(
      simulationState.simulation.step,
      simulationState.receptions.lastCustomerInTime,
      simulationState.receptions.newCustomerFrequency,
      !!simulationState.receptions.newCustomers.length
    );

    this.startedGettingOrderLogic(
      simulationState.simulation.step,
      simulationState.receptions.receptions
    );
    this.endedGettingOrderLogic(
      simulationState.simulation.step,
      simulationState.receptions.receptions
    );

    this.removeEmptyQueuePlace(simulationState.receptions.receptions);
  }

  newCustomerLogic(
    CurrentTime: number,
    lastCustomerTime: number,
    newCustomerFrequency: number,
    isHasNewCustomers: boolean
  ) {
    if (
      isHasNewCustomers &&
      (CurrentTime - lastCustomerTime) % newCustomerFrequency === 0
    ) {
      this.store.dispatch(new ReceptionsActions.addCustomerToQueue());
    }
  }

  startedGettingOrderLogic(CurrentTime: number, receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (this.checkStartGetOrder(receptions[i])) {
        this.store.dispatch(
          new ReceptionsActions.startGetOrder(i, CurrentTime)
        );
      }
    }
  }

  checkStartGetOrder(reception: Reception): boolean {
    if (
      reception.customersInQueue.length &&
      reception.currentOccupation === "Empty" &&
      !reception.isHasCompletedCustomer
    ) {
      return true;
    }
    return false;
  }

  endedGettingOrderLogic(CurrentTime: number, receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (this.checkEndGetOrder(receptions[i], CurrentTime)) {
        this.store.dispatch(new ReceptionsActions.endGetOrder(i));
      }
    }
  }

  checkEndGetOrder(reception: Reception, CurrentTime: number): boolean {
    if (
      reception.currentOccupation === "Getting order" &&
      reception.getOrderTime + reception.startedGetOrderTime === CurrentTime - 1
    ) {
      return true;
    }
    return false;
  }

  removeEmptyQueuePlace(receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (receptions[i].isHasCompletedCustomer) {
        this.store.dispatch(new ReceptionsActions.moveQueue(i));
      }
    }
  }
}
