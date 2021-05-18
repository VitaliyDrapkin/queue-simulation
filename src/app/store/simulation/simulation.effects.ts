import { PREPARE_SIMULATION } from "./../receptions/receptions.actions";
import { SimulationService } from "./../../services/simulation.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./../app.reducer";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as SimulationActions from "./simulation.actions";
import { switchMap, delay, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class SimulationEffects {
  @Effect()
  prepareSimulation = this.actions$.pipe(
    ofType(SimulationActions.PREPARE_SIMULATION),
    switchMap(() => {
      return of(new SimulationActions.StartSimulation());
    })
  );

  @Effect()
  startSimulation = this.actions$.pipe(
    ofType(SimulationActions.START_SIMULATION),
    switchMap(() => {
      return of(new SimulationActions.StartNewStep());
    })
  );

  @Effect()
  startNewStep = this.actions$.pipe(
    ofType(SimulationActions.START_NEW_STEP),
    switchMap(() => {
      return of(new SimulationActions.CheckSimulationMovies()).pipe(
        delay(1000)
      );
    })
  );

  @Effect()
  checkSimulationMovies = this.actions$.pipe(
    ofType(SimulationActions.CHECK_SIMULATION_MOVIES),
    withLatestFrom(this.store$),
    switchMap(([actionData, simulationState]) => {
      this.simulationService.checkSimulationMoves(simulationState);
      return of(new SimulationActions.StartNewStep());
    })
  );

  constructor(
    private actions$: Actions,
    private simulationService: SimulationService,
    private store$: Store<AppState>
  ) {}
}
