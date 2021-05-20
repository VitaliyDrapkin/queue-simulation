import * as scenario from "../../assets/scenario.json";
import { SimulationService } from "../services/simulation.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-start-page",
  templateUrl: "./start-page.component.html",
  styleUrls: ["./start-page.component.scss"],
})
export class StartPageComponent implements OnInit {
  inputValue: string;
  constructor(
    private router: Router,
    public simulationService: SimulationService
  ) {}

  ngOnInit(): void {}

  onStartSimulation() {
    if (!this.inputValue) {
      this.simulationService.startSimulation();
    } else {
      this.simulationService.startSimulation(this.inputValue);
    }
    this.router.navigate(["simulation"]);
  }
}
