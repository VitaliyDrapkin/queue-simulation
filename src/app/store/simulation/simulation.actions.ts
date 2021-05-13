import { Simulation } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const SET_INITIAL_DATA = "Set initial data";
export const START_SIMULATION = "Start simulation";
export const PAUSE_SIMULATION = "Pause simulation";
export const START_STEP_TIMER = "Start step timer";
export const END_STEP_TIMER = "End step timer";

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

export class startStepTimer implements Action {
  readonly type = START_STEP_TIMER;
}

export class EndStepTimer implements Action {
  readonly type = END_STEP_TIMER;
}

export type SimulationActions =
  | startSimulation
  | pauseSimulation
  | setInitialData
  | startStepTimer
  | EndStepTimer;
