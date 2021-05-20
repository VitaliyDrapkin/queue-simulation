import { delay } from "rxjs/operators";
import { of } from "rxjs";
import { WorkplaceService } from "./workplace.service";
import { OrdersService } from "./orders.service";
import { ReceptionService } from "./reception.service";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";
import * as ReceptionsActions from "../store/receptions/receptions.actions";
import * as WorkplacesActions from "../store/workPlaces/workplaces.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  timeOut: ReturnType<typeof setTimeout>;
  constructor(
    public store: Store<fromApp.AppState>,
    public receptionService: ReceptionService,
    public ordersService: OrdersService,
    public workplaceService: WorkplaceService
  ) {}

  startSimulation(jsonSimulation: string) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.store.dispatch(
      new ReceptionsActions.PrepareSimulation(JSON.parse(jsonSimulation))
    );
    this.store.dispatch(
      new WorkplacesActions.PrepareSimulation(JSON.parse(jsonSimulation))
    );
    this.store.dispatch(new SimulationActions.FinishPrepareSimulation());
  }

  stopSimulation() {}

  checkSimulationMoves(appState: AppState) {
    this.receptionService.checkMovies(appState);
    this.ordersService.checkMovies(appState);
    this.workplaceService.checkMovies(appState);
  }

  delaySimulation(simulationSpeed: number, isSimulationPlaying: boolean) {
    if (!isSimulationPlaying) {
      return of(new SimulationActions.CheckSimulationMovies());
    }
    return of(new SimulationActions.CheckSimulationMovies()).pipe(
      delay(1000 / simulationSpeed)
    );
  }

  makeNewStep(speedMilliseconds: number) {
    this.timeOut = setTimeout(
      () => this.store.dispatch(new SimulationActions.MakeTimeOutStep()),
      speedMilliseconds
    );
  }
}
