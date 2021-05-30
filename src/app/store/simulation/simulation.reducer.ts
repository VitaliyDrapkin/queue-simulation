import * as SimulationActions from "./simulation.actions";

export interface State {
  isSimulationInit: boolean;
  isSimulationPlaying: boolean;
  currentTime: number;
  speedMilliseconds: number;
}

const initialState: State = {
  isSimulationInit: false,
  isSimulationPlaying: false,
  currentTime: 0,
  speedMilliseconds: 1000,
};

export function receptionsReducer(
  state = initialState,
  action: SimulationActions.SimulationActions
) {
  switch (action.type) {
    case SimulationActions.PREPARE_SIMULATION:
      return {
        ...state,
        currentTime: 0,
        speedMilliseconds: 1000,
      };
    case SimulationActions.FINISH_PREPARE_SIMULATION:
      return {
        ...state,
        isSimulationInit: true,
        isSimulationPlaying: true,
      };

    case SimulationActions.PLAY_SIMULATION:
      return {
        ...state,
        isSimulationPlaying: true,
      };
    case SimulationActions.PAUSE_SIMULATION:
      return {
        ...state,
        isSimulationPlaying: false,
      };

    case SimulationActions.MAKE_STEP:
      if (state.isSimulationPlaying) {
        return {
          ...state,
          currentTime: state.currentTime + 1,
        };
      }
      return { ...state };

    case SimulationActions.MAKE_ONE_STEP_BY_CLICK:
      return {
        ...state,
        currentTime: state.currentTime + 1,
      };

    case SimulationActions.CHECK_SIMULATION_MOVES:
      return {
        ...state,
      };

    case SimulationActions.UP_SPEED_TIME:
      return {
        ...state,
        speedMilliseconds: state.speedMilliseconds / 1.5,
      };
    case SimulationActions.REDUCE_SPEED_TIME:
      return {
        ...state,
        speedMilliseconds: state.speedMilliseconds * 1.5,
      };

    default: {
      return state;
    }
  }
}
