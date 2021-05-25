import { ScenarioRequest } from "./scenario-request.service";
import { Simulation } from "./../models/simulation.model";
import { delay } from "rxjs/operators";
import { of } from "rxjs";
import { WorkplaceService } from "./workplace.service";
import { OrdersService } from "./orders.service";
import { ReceptionService } from "./reception.service";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";
import * as ReceptionsActions from "../store/receptions/receptions.actions";
import * as WorkplacesActions from "../store/workplaces/workplaces.actions";
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
    public workplaceService: WorkplaceService,
    public scenarioRequest: ScenarioRequest
  ) {}

  startSimulation(scenarioJson: string) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    const scenario: Simulation = JSON.parse(scenarioJson);

    this.store.dispatch(new SimulationActions.PrepareSimulation());
    this.store.dispatch(
      new ReceptionsActions.PrepareSimulation({
        products: scenario.products,
        customers: scenario.customers,
        receptions: scenario.receptions,
        receptionTypes: scenario.receptionTypes,
        ingredients: scenario.ingredients,
        newCustomerFrequency: scenario.newCustomerFrequency,
      })
    );
    this.store.dispatch(
      new WorkplacesActions.PrepareSimulation({
        workplaces: scenario.workplaces,
      })
    );
    this.store.dispatch(new SimulationActions.FinishPrepareSimulation());
  }

  checkSimulationMoves(appState: AppState) {
    this.receptionService.checkMoves(appState);
    this.ordersService.checkMoves(appState);
    this.workplaceService.checkMoves(appState);
  }

  delaySimulation(simulationSpeed: number, isSimulationPlaying: boolean) {
    if (!isSimulationPlaying) {
      return of(new SimulationActions.CheckSimulationMoves());
    }
    return of(new SimulationActions.CheckSimulationMoves()).pipe(
      delay(1000 / simulationSpeed)
    );
  }

  makeNewStep(speedMilliseconds: number) {
    this.timeOut = setTimeout(
      () => this.store.dispatch(new SimulationActions.MakeStep()),
      speedMilliseconds
    );
  }

  startDemo() {
    const scenario = this.scenarioRequest
      .getDemoScenarioJson()
      .subscribe((data) => this.startSimulation(data));
  }
}
