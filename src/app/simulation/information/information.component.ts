import { SimulationService } from "./../../services/simulation.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent implements OnInit {
  constructor(private simulationService: SimulationService) {}

  ngOnInit(): void {}
}
