import { OrdersEditorService } from "./ordersEditor.service";
import { DeliveryService } from "./delivery.service";
import { ScenarioRequest } from "./scenario-request.service";
import { Scenario } from "../models/Scenario.model";
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
import * as OrdersActions from "../store/orders/orders.actions";
import * as DeliveriesActions from "../store/deliveries/deliveries.actions";
import * as BusinessDataActions from "../store/businessData/businessData.actions";

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
    public deliveryService: DeliveryService,
    public ordersEditorService: OrdersEditorService,
    public scenarioRequest: ScenarioRequest
  ) {}

  startSimulation(scenarioJson: string) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    const scenario: Scenario = JSON.parse(scenarioJson);

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
      new DeliveriesActions.PrepareSimulation({
        deliveries: scenario.deliveries,
      })
    );

    this.store.dispatch(
      new WorkplacesActions.PrepareSimulation({
        workplaces: scenario.workplaces,
      })
    );

    this.store.dispatch(
      new BusinessDataActions.PrepareSimulation({
        products: scenario.products,
        ingredients: scenario.ingredients,
      })
    );

    this.store.dispatch(new OrdersActions.PrepareSimulation());

    this.store.dispatch(new SimulationActions.FinishPrepareSimulation());
  }

  checkSimulationMoves(appState: AppState) {
    this.receptionService.checkMoves(appState);
    this.ordersService.checkMoves(appState);
    this.workplaceService.checkMoves(appState);
    this.deliveryService.checkMoves(appState);
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

  //For developer tests
  startDemo() {
    this.scenarioRequest
      .getDemoScenarioJson()
      .subscribe((data) => this.startSimulation(data));
  }
}
