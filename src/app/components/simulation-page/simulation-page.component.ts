import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-simulation-page",
  templateUrl: "./simulation-page.component.html",
  styleUrls: ["./simulation-page.component.scss"],
})
export class SimulationPageComponent implements OnInit {
  queues = [1, 2, 3, 4];
  constructor() {}

  ngOnInit(): void {}
}
