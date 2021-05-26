import { Workplace } from "./../../models/workplace-model";

export function prepareWorkplaces(state, payload: { workplaces: number }) {
  const workplaces: Workplace[] = [];
  for (let i = 0; i < payload.workplaces; i++) {
    const newWorkPlace = new Workplace(i + 1);
    workplaces.push(newWorkPlace);
  }
  return {
    ...state,
    workplaces: workplaces,
  };
}
