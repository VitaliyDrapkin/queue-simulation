import { jsonDefault } from "../../../assets/JSON";

import { SimulationService } from "./../../services/simulation.service";
import { Observable } from "rxjs";
import * as SimulationActions from "./../../store/simulation/simulation.actions";
import { Store } from "@ngrx/store";
import { ReceptionService } from "../../services/reception.service";
import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent implements OnInit {
  isSimulationPlaying: Observable<boolean>;
  isSimulationInit: Observable<boolean>;
  constructor(
    private simulationService: SimulationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isSimulationPlaying = this.store.select(
      (state) => state.simulation.isSimulationPlaying
    );
    this.isSimulationInit = this.store.select(
      (state) => state.simulation.isSimulationInit
    );
  }

  onStartSimulation() {
    this.simulationService.startSimulation(jsonDefault);
  }
  onPause() {
    this.store.dispatch(new SimulationActions.PauseSimulation());
  }

  onNextStep() {
    this.store.dispatch(new SimulationActions.PlayStep());
  }
  onPlay() {
    this.store.dispatch(new SimulationActions.PlaySimulation());
  }
  onUpSpeed() {
    this.store.dispatch(new SimulationActions.UpSpeed());
  }
  onReduceSpeed() {
    this.store.dispatch(new SimulationActions.reduceSpeed());
  }
}
