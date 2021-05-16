import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./../app.reducer";
import { SimulationService } from "./../../services/simulation.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as SimulationActions from "./simulation.actions";
import {
  switchMap,
  timeout,
  map,
  tap,
  delay,
  withLatestFrom,
} from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class SimulationEffects {
  @Effect()
  startSimulation = this.actions$.pipe(
    ofType(SimulationActions.START_SIMULATION),
    switchMap(() => {
      return of(new SimulationActions.startStepTimer());
    })
  );

  @Effect()
  startStepTimer = this.actions$.pipe(
    ofType(SimulationActions.START_STEP_TIMER),
    switchMap(() => {
      return of(new SimulationActions.EndStepTimer()).pipe(delay(1000));
    })
  );

  @Effect()
  endStepTimer = this.actions$.pipe(
    ofType(SimulationActions.END_STEP_TIMER),
    withLatestFrom(this.store$),
    switchMap(([actionData, simulationState]) => {
      this.simulationService.checkSimulationMoves(simulationState);
      return of(new SimulationActions.startStepTimer());
    })
  );

  constructor(
    private actions$: Actions,
    private simulationService: SimulationService,
    private store$: Store<AppState>
  ) {}
}
