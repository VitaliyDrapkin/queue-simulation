import * as SimulationActions from "../../../store/simulation/simulation.actions";
import { jsonDefault } from "../../../../assets/JSON";
import { Store } from "@ngrx/store";
import { SimulationService } from "../../../services/simulation.service";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-play-menu",
  templateUrl: "./play-menu.component.html",
  styleUrls: ["./play-menu.component.scss"],
})
export class PlayMenuComponent implements OnInit {
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
    this.simulationService.startSimulation();
  }
  onPause() {
    this.store.dispatch(new SimulationActions.PauseSimulation());
  }
  onPlay() {
    this.store.dispatch(new SimulationActions.PlaySimulation());
  }
  onPlayStep() {
    this.store.dispatch(new SimulationActions.MakeOneStepByClick());
  }
  onUpSpeed() {
    this.store.dispatch(new SimulationActions.UpSpeed());
  }
  onReduceSpeed() {
    this.store.dispatch(new SimulationActions.reduceSpeed());
  }
}
