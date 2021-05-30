import { Scenario } from "../../models/Scenario.model";
import { Action } from "@ngrx/store";

export const PREPARE_SIMULATION = "@@simulation/PREPARE_SIMULATION";
export const FINISH_PREPARE_SIMULATION =
  "@@simulation/FINISH_PREPARE_SIMULATION";
export const PAUSE_SIMULATION = "@@simulation/PAUSE_SIMULATION";
export const PLAY_SIMULATION = "@@simulation/PLAY_SIMULATION";
export const MAKE_STEP = "@@simulation/MAKE_STEP";
export const MAKE_ONE_STEP_BY_CLICK = "@@simulation/MAKE_CLICKED_STEP";
export const CHECK_SIMULATION_MOVES = "@@simulation/CHECK_SIMULATION_MOVES";
export const UP_SPEED_TIME = "@@simulation/UP_SPEED_TIME";
export const REDUCE_SPEED_TIME = "@@simulation/REDUCE_SPEED_TIME";

export class PrepareSimulation implements Action {
  readonly type = PREPARE_SIMULATION;
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

export class MakeStep implements Action {
  readonly type = MAKE_STEP;
}
export class MakeOneStepByClick implements Action {
  readonly type = MAKE_ONE_STEP_BY_CLICK;
}

export class CheckSimulationMoves implements Action {
  readonly type = CHECK_SIMULATION_MOVES;
}
export class UpSpeed implements Action {
  readonly type = UP_SPEED_TIME;
}
export class reduceSpeed implements Action {
  readonly type = REDUCE_SPEED_TIME;
}

export type SimulationActions =
  | PrepareSimulation
  | FinishPrepareSimulation
  | PauseSimulation
  | MakeStep
  | MakeOneStepByClick
  | CheckSimulationMoves
  | UpSpeed
  | reduceSpeed
  | PlaySimulation
  | PauseSimulation;
