import { ScenarioRequest } from "./../services/scenario-request.service";
import { ValidationsService } from "./../services/validations.service";
import * as scenario from "../../assets/scenario.json";
import { SimulationService } from "../services/simulation.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-start-page",
  templateUrl: "./start-page.component.html",
  styleUrls: ["./start-page.component.scss"],
})
export class StartPageComponent implements OnInit {
  scenarioForm: FormGroup;
  inputValue: string;
  constructor(
    private router: Router,
    public simulationService: SimulationService,
    public validationsService: ValidationsService,
    public scenarioRequest: ScenarioRequest
  ) {}

  ngOnInit(): void {
    this.scenarioForm = new FormGroup({
      mainInput: new FormControl(null, Validators.required),
    });
  }

  onStartSimulation() {
    const isJsonValid = this.validationsService.isJsonValid(
      this.scenarioForm.get("mainInput").value
    );
    if (!isJsonValid) {
      this.scenarioForm.get("mainInput").setErrors({ incorrect: true });
      return;
    }
    this.simulationService.startSimulation(this.inputValue);
    this.router.navigate(["simulation"]);
  }

  onLoadDemo() {
    this.scenarioRequest.getJSON().subscribe((data) => {
      this.scenarioForm.get("mainInput").setValue(JSON.stringify(data));
    });
  }
}
