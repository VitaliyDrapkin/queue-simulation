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
      this.scenarioForm.controls.mainInput.value
    );
    if (!isJsonValid) {
      this.scenarioForm.controls.mainInput.setErrors({ incorrect: true });
      return;
    }
    this.simulationService.startSimulation(
      this.scenarioForm.controls.mainInput.value
    );
    this.router.navigate(["simulation"]);
  }

  onLoadDemo() {
    this.scenarioRequest.getDemoScenarioJson().subscribe((data) => {
      this.scenarioForm.controls.mainInput.setValue(data);
    });
  }
}
