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
      return {
        ...state,
        isSimulationRunning: true,
      };

    case SimulationActions.PAUSE_SIMULATION:
      return {
        ...state,
        isSimulationRunning: false,
      };

    case SimulationActions.END_STEP_TIMER:
      return {
        ...state,
        step: state.step + 1,
      };
    case SimulationActions.START_STEP_TIMER:
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
}
