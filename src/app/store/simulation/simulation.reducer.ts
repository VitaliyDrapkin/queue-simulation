import * as SimulationActions from "./simulation.actions";

export interface State {
  isSimulationInit: boolean;
  isSimulationPlaying: boolean;
  step: number;
  speedMilliseconds: number;
}

const initialState: State = {
  isSimulationInit: false,
  isSimulationPlaying: false,
  step: 0,
  speedMilliseconds: 1000,
};

export function receptionsReducer(
  state = initialState,
  action: SimulationActions.SimulationActions
) {
  switch (action.type) {
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
      console.log("[SimulationReducer]  pauseSimulation()");
      return {
        ...state,
        isSimulationPlaying: false,
      };

    case SimulationActions.MAKE_TIME_OUT_STEP:
      console.log("[SimulationReducer]  makeTimeOutStep()");
      if (state.isSimulationPlaying) {
        return {
          ...state,
          step: state.step + 1,
        };
      }
      return { ...state };

    case SimulationActions.MAKE_CLICKED_STEP:
      console.log("[SimulationReducer]  makeClickedStep()");
      return {
        ...state,
        step: state.step + 1,
      };

    case SimulationActions.CHECK_SIMULATION_MOVIES:
      console.log("[SimulationReducer]  checkSimulationMovies()");
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
