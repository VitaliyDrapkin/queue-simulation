import { WorkplaceService } from "./workplace.service";
import { OrdersService } from "./orders.service";
import { ReceptionService } from "./reception.service";
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
    public receptionService: ReceptionService,
    public ordersService: OrdersService,
    public workplaceService: WorkplaceService
  ) {}

  startSimulation(jsonSimulation: string) {
    this.store.dispatch(
      new SimulationActions.PrepareSimulation(JSON.parse(jsonSimulation))
    );
  }

  stopSimulation() {}

  checkSimulationMoves(simulationState: AppState) {
    this.receptionService.checkMovies(simulationState);
    this.ordersService.checkMovies(simulationState);
    this.workplaceService.checkMovies(simulationState);
  }
}
