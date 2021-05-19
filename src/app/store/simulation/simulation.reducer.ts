import * as SimulationActions from "./simulation.actions";

export interface State {
  isSimulationInit: boolean;
  isSimulationPlaying: boolean;
  step: number;
  simulationSpeed: number;
}

const initialState: State = {
  isSimulationInit: false,
  isSimulationPlaying: false,
  step: 0,
  simulationSpeed: 1,
};

export function receptionsReducer(
  state = initialState,
  action: SimulationActions.SimulationActions
) {
  switch (action.type) {
    case SimulationActions.START_SIMULATION:
      return {
        ...state,
        isSimulationInit: true,
        isSimulationPlaying: true,
      };

    case SimulationActions.PLAY_SIMULATION:
      console.log("[SimulationReducer]  playSimulation()");
      return {
        ...state,
        isSimulationPlaying: true,
      };
    case SimulationActions.PAUSE_SIMULATION:
      console.log("[SimulationReducer]  pauseSimulation()");
      return {
        ...state,
        isSimulationPlaying: false,
      };

    case SimulationActions.START_NEW_STEP:
      console.log("[SimulationReducer]  startNewStep()", state.step);
      return {
        ...state,
      };

    case SimulationActions.CHECK_SIMULATION_MOVIES:
      console.log("[SimulationReducer]  checkSimulationMovies()");
      return {
        ...state,
        step: state.step + 1,
      };
    case SimulationActions.UP_SPEED:
      console.log("[SimulationReducer]  upSpeed()");
      return {
        ...state,
        simulationSpeed: state.simulationSpeed * 1.5,
      };
    case SimulationActions.REDUCE_SPEED:
      console.log("[SimulationReducer]  reduceSpeed()");
      return {
        ...state,
        simulationSpeed: state.simulationSpeed / 1.5,
      };

    default: {
      return state;
    }
  }
}
