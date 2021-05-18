import { Simulation } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const START_SIMULATION = "@@map/START_SIMULATION";
export const PREPARE_SIMULATION = "@@map/PREPARE_SIMULATION";
export const PAUSE_SIMULATION = "@@map/PAUSE_SIMULATION";
export const START_NEW_STEP = "@@map/START_NEW_STEP";
export const CHECK_SIMULATION_MOVIES = "@@map/CHECK_SIMULATION_MOVIES";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(public payload: Simulation) {}
}
export class StartSimulation implements Action {
  readonly type = START_SIMULATION;
}

export class PauseSimulation implements Action {
  readonly type = PAUSE_SIMULATION;
}

export class StartNewStep implements Action {
  readonly type = START_NEW_STEP;
}

export class CheckSimulationMovies implements Action {
  readonly type = CHECK_SIMULATION_MOVIES;
}

export type SimulationActions =
  | StartSimulation
  | PauseSimulation
  | StartNewStep
  | CheckSimulationMovies;
