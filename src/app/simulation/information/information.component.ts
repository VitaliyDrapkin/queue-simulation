import { ReceptionService } from "../../services/reception.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent implements OnInit {
  constructor(private simulationService: ReceptionService) {}

  ngOnInit(): void {}
}
