import { ReceptionService } from "./reception.service";
import { Reception } from "../models/reception.model";
import { Customer } from "../models/customer.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as SimulationActions from "../store/simulation/simulation.actions";
import * as ReceptionsActions from "../store/receptions/receptions.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  constructor(public store: Store<fromApp.AppState>) {}
}
