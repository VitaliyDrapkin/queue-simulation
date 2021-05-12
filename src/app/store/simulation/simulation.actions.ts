import { Simulation } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const SET_INITIAL_DATA = "Set initial data";
export const START_SIMULATION = "Start simulation";
export const PAUSE_SIMULATION = "Pause simulation";
export const MAKE_STEP = "Make a step";

export class startSimulation implements Action {
  readonly type = START_SIMULATION;
}

export class pauseSimulation implements Action {
  readonly type = PAUSE_SIMULATION;
}
export class setInitialData implements Action {
  readonly type = SET_INITIAL_DATA;

  constructor(public payload: Simulation) {}
}

export class makeStep implements Action {
  readonly type = MAKE_STEP;
}

export type SimulationActions =
  | startSimulation
  | pauseSimulation
  | setInitialData
  | makeStep;
