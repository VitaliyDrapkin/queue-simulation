import { ActionReducerMap } from "@ngrx/store";

import * as fromReception from "./receptions/receptions.reducer";
import * as fromSimulation from "./simulation/simulation.reducer";

export interface AppState {
  receptions: fromReception.State;
  simulation: fromSimulation.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  receptions: fromReception.receptionsReducer,
  simulation: fromSimulation.receptionsReducer,
};
