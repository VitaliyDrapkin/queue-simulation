import { Customer } from "./../models/customer.model";
import { AppState } from "./../store/app.reducer";
import { map, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  test: Observable<any>;
  interval: any;
  constructor(public store: Store<fromApp.AppState>) {}

  runSimulation = () => {
    this.store.dispatch(new SimulationActions.startSimulation());
  };

  stopSimulation() {
    clearInterval(this.interval);
  }

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
