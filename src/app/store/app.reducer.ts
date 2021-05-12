import { ActionReducerMap } from "@ngrx/store";

import * as fromReception from "./receptions/receptions.reducer";

export interface AppState {
  receptions: fromReception.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  receptions: fromReception.receptionsReducer,
};
