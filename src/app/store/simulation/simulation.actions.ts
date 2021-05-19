import { Simulation } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const START_SIMULATION = "@@map/START_SIMULATION";
export const PREPARE_SIMULATION = "@@map/PREPARE_SIMULATION";
export const PAUSE_SIMULATION = "@@map/PAUSE_SIMULATION";
export const PLAY_SIMULATION = "@@map/PLAY_SIMULATION";
export const START_NEW_STEP = "@@map/START_NEW_STEP";
export const PLAY_STEP = "@@map/PLAY_STEP";
export const CHECK_SIMULATION_MOVIES = "@@map/CHECK_SIMULATION_MOVIES";
export const UP_SPEED = "@@map/UP_SPEED";
export const REDUCE_SPEED = "@@map/REDUCE_SPEED";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(public payload: Simulation) {}
}
export class StartSimulation implements Action {
  readonly type = START_SIMULATION;
}

export class PlaySimulation implements Action {
  readonly type = PLAY_SIMULATION;
}

export class PauseSimulation implements Action {
  readonly type = PAUSE_SIMULATION;
}

export class PlayStep implements Action {
  readonly type = PLAY_STEP;
}

export class StartNewStep implements Action {
  readonly type = START_NEW_STEP;
}

export class CheckSimulationMovies implements Action {
  readonly type = CHECK_SIMULATION_MOVIES;
}
export class UpSpeed implements Action {
  readonly type = UP_SPEED;
}
export class reduceSpeed implements Action {
  readonly type = REDUCE_SPEED;
}

export type SimulationActions =
  | StartSimulation
  | PauseSimulation
  | StartNewStep
  | CheckSimulationMovies
  | UpSpeed
  | reduceSpeed
  | PlaySimulation
  | PauseSimulation
  | PlayStep;
