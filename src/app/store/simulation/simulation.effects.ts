import { zip } from "rxjs";
import { SimulationService } from "./../../services/simulation.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./../app.reducer";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as SimulationActions from "./simulation.actions";
import { withLatestFrom, tap } from "rxjs/operators";

import * as WorkplacesActions from "../workplaces/workplaces.actions";
import * as ReceptionsActions from "../receptions/receptions.actions";

@Injectable()
export class SimulationEffects {
  @Effect({ dispatch: false })
  finishPrepareSimulation = this.actions$.pipe(
    ofType(SimulationActions.FINISH_PREPARE_SIMULATION),
    withLatestFrom(this.store$),
    tap(([actionData, appState]) => {
      this.simulationService.makeNewStep(appState.simulation.speedMilliseconds);
    })
  );

  @Effect({ dispatch: false })
  makeStep = this.actions$.pipe(
    ofType(SimulationActions.MAKE_STEP),
    withLatestFrom(this.store$),
    tap(([actionData, appState]) => {
      if (appState.simulation.isSimulationPlaying) {
        this.simulationService.checkSimulationMoves(appState);
        this.simulationService.makeNewStep(
          appState.simulation.speedMilliseconds
        );
      }
    })
  );

  @Effect({ dispatch: false })
  makeOneStepByClick = this.actions$.pipe(
    ofType(SimulationActions.MAKE_ONE_STEP_BY_CLICK),
    withLatestFrom(this.store$),
    tap(([actionData, appState]) => {
      this.simulationService.checkSimulationMoves(appState);
    })
  );

  @Effect({ dispatch: false })
  playSimulation = this.actions$.pipe(
    ofType(SimulationActions.PLAY_SIMULATION),
    withLatestFrom(this.store$),
    tap(([actionData, appState]) => {
      this.simulationService.makeNewStep(appState.simulation.speedMilliseconds);
    })
  );

  constructor(
    private actions$: Actions,
    private simulationService: SimulationService,
    private store$: Store<AppState>
  ) {}
}
