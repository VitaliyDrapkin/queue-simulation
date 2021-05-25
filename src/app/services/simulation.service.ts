import { OrdersEditorService } from "./ordersEditor.service";
import { DeliveryService } from "./delivery.service";
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
import * as OrdersActions from "../store/orders/orders.actions";
import * as DeliveriesActions from "../store/deliveries/deliveries.actions";

import * as scenario from "../../assets/scenario.json";

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
    public ordersEditorService: OrdersEditorService
  ) {}

  getDefaultJson(jsonFile: any): Simulation {
    return jsonFile.default;
  }

  startSimulation(jsonSimulation?: string) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (!jsonSimulation) {
      this.store.dispatch(
        new ReceptionsActions.PrepareSimulation(this.getDefaultJson(scenario))
      );
      this.store.dispatch(
        new DeliveriesActions.PrepareSimulation(this.getDefaultJson(scenario))
      );
      this.store.dispatch(
        new WorkplacesActions.PrepareSimulation(this.getDefaultJson(scenario))
      );
      this.store.dispatch(new OrdersActions.PrepareSimulation());
      this.store.dispatch(new SimulationActions.FinishPrepareSimulation());
      this.ordersEditorService.prepareSimulation(this.getDefaultJson(scenario));
      return;
    }

    this.store.dispatch(
      new ReceptionsActions.PrepareSimulation(JSON.parse(jsonSimulation))
    );
    this.store.dispatch(
      new DeliveriesActions.PrepareSimulation(JSON.parse(jsonSimulation))
    );
    this.store.dispatch(
      new WorkplacesActions.PrepareSimulation(JSON.parse(jsonSimulation))
    );
    this.ordersEditorService.prepareSimulation(JSON.parse(jsonSimulation));
    this.store.dispatch(new OrdersActions.PrepareSimulation());

    this.store.dispatch(new SimulationActions.FinishPrepareSimulation());
  }

  stopSimulation() {}

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
}
