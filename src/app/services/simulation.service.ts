import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  interval: any;
  constructor(public store: Store<fromApp.AppState>) {}

  runSimulation = (speed: number = 1) => {
    this.interval = setInterval(
      () => this.store.dispatch(new ReceptionsActions.makeStep()),
      1000 / 1
    );
  };

  stopSimulation() {
    clearInterval(this.interval);
  }
}
