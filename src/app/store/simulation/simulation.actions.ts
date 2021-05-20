import { Simulation } from "./../../models/simulation.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@simulation/PREPARE_SIMULATION";
export const FINISH_PREPARE_SIMULATION =
  "@@simulation/FINISH_PREPARE_SIMULATION";
export const PAUSE_SIMULATION = "@@simulation/PAUSE_SIMULATION";
export const PLAY_SIMULATION = "@@simulation/PLAY_SIMULATION";
export const MAKE_TIME_OUT_STEP = "@@simulation/MAKE_TIME_OUT_STEP";
export const MAKE_CLICKED_STEP = "@@simulation/MAKE_CLICKED_STEP";
export const MAKE_STEP = "@@simulation/MAKE_STEP";
export const PLAY_STEP = "@@simulation/PLAY_STEP";
export const CHECK_SIMULATION_MOVIES = "@@simulation/CHECK_SIMULATION_MOVIES";
export const UP_SPEED_TIME = "@@simulation/UP_SPEED_TIME";
export const REDUCE_SPEED_TIME = "@@simulation/REDUCE_SPEED_TIME";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
  constructor(public payload: Simulation) {}
}
export class FinishPrepareSimulation implements Action {
  readonly type = FINISH_PREPARE_SIMULATION;
}

export class PlaySimulation implements Action {
  readonly type = PLAY_SIMULATION;
}

export class PauseSimulation implements Action {
  readonly type = PAUSE_SIMULATION;
}

export class MakeTimeOutStep implements Action {
  readonly type = MAKE_TIME_OUT_STEP;
}
export class MakeClickedStep implements Action {
  readonly type = MAKE_CLICKED_STEP;
}

export class CheckSimulationMovies implements Action {
  readonly type = CHECK_SIMULATION_MOVIES;
}
export class UpSpeed implements Action {
  readonly type = UP_SPEED_TIME;
}
export class reduceSpeed implements Action {
  readonly type = REDUCE_SPEED_TIME;
}

export type SimulationActions =
  | FinishPrepareSimulation
  | PauseSimulation
  | MakeTimeOutStep
  | MakeClickedStep
  | CheckSimulationMovies
  | UpSpeed
  | reduceSpeed
  | PlaySimulation
  | PauseSimulation;
