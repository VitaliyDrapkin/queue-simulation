import { ActionReducerMap } from "@ngrx/store";

import * as fromReception from "./receptions/receptions.reducer";
import * as fromSimulation from "./simulation/simulation.reducer";
import * as fromOrders from "./orders/orders.reducer";
import * as fromWorkPlaces from "./workplaces/workplaces.reducer";

export interface AppState {
  receptions: fromReception.State;
  simulation: fromSimulation.State;
  orders: fromOrders.State;
  workplaces: fromWorkPlaces.State;
  logs: any;
}

export const appReducer: ActionReducerMap<AppState> = {
  receptions: fromReception.receptionsReducer,
  simulation: fromSimulation.receptionsReducer,
  orders: fromOrders.ordersReducer,
  workplaces: fromWorkPlaces.workplacesReducer,
  logs: logsReducer,
};

export function logsReducer(state = {}, action: any) {
  // console.log("[AppReducer]  logsReducer()", action);
  return state;
}
