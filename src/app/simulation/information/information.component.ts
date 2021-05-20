import { jsonDefault } from "../../../assets/JSON";

import { SimulationService } from "./../../services/simulation.service";
import { Observable } from "rxjs";
import * as SimulationActions from "./../../store/simulation/simulation.actions";
import { Store } from "@ngrx/store";
import { ReceptionService } from "../../services/reception.service";
import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent implements OnInit {
  constructor(
    private simulationService: SimulationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.store.subscribe((data) =>
    //   console.log("[InformationComponent]  changeState()", data)
    // );
  }
}
