import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as SimulationActions from "./simulation.actions";
import { switchMap } from "rxjs/operators";

@Injectable()
export class SimulationEffects {
  @Effect({ dispatch: false })
  test = this.actions$.pipe(
    ofType(SimulationActions.START_SIMULATION),
    switchMap(() => alert("Here"))
  );

  constructor(private actions$: Actions) {}
}
