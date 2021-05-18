import * as SimulationActions from "./simulation.actions";

export interface State {
  isSimulationRunning: boolean;
  step: number;
}

const initialState: State = {
  isSimulationRunning: false,
  step: 0,
};

export function receptionsReducer(
  state = initialState,
  action: SimulationActions.SimulationActions
) {
  switch (action.type) {
    case SimulationActions.START_SIMULATION:
      console.log("[SimulationReducer]  startSimulation()");
      return {
        ...state,
        isSimulationRunning: true,
      };

    case SimulationActions.PAUSE_SIMULATION:
      return {
        ...state,
        isSimulationRunning: false,
      };

    case SimulationActions.START_NEW_STEP:
      console.log("[SimulationReducer]  startNewStep()", state.step);
      return {
        ...state,
      };

    case SimulationActions.CHECK_SIMULATION_MOVIES:
      console.log("[SimulationReducer]  check simulation movies()");
      return {
        ...state,
        step: state.step + 1,
      };

    default: {
      return state;
    }
  }
}
