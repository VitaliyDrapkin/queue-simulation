import { Customer } from "./../models/customer.model";
import { AppState } from "./../store/app.reducer";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";

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
      simulationState.receptions.lastCustomerInTime,
      simulationState.receptions.newCustomerFrequency,
      simulationState.simulation.step,
      !!simulationState.receptions.newCustomers.length
    );
  }

  newCustomerLogic(
    lastCustomerTime: number,
    newCustomerFrequency: number,
    CurrentTime: number,
    isHasNewCustomers: boolean
  ) {
    if (
      isHasNewCustomers &&
      (CurrentTime - lastCustomerTime) % newCustomerFrequency === 0
    ) {
      this.store.dispatch(new ReceptionsActions.addCustomerToQueue());
    }
  }
}
