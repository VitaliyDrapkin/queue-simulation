import { ReceptionService } from "./reception.service";
import { Reception } from "../models/reception.model";
import { Customer } from "../models/customer.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  constructor(
    public store: Store<fromApp.AppState>,
    public receptionService: ReceptionService
  ) {}

  startSimulation(jsonSimulation: string) {
    this.store.dispatch(
      new SimulationActions.startSimulation(JSON.parse(jsonSimulation))
    );
  }

  stopSimulation() {}

  checkSimulationMoves(simulationState: AppState) {
    this.receptionService.newCustomerLogic(
      simulationState.simulation.step,
      simulationState.receptions.lastCustomerInTime,
      simulationState.receptions.newCustomerFrequency,
      !!simulationState.receptions.newCustomers.length
    );

    this.receptionService.startedGettingOrderLogic(
      simulationState.simulation.step,
      simulationState.receptions.receptions
    );
    this.receptionService.endedGettingOrderLogic(
      simulationState.simulation.step,
      simulationState.receptions.receptions
    );

    this.receptionService.removeEmptyQueuePlace(
      simulationState.receptions.receptions
    );
  }
}
