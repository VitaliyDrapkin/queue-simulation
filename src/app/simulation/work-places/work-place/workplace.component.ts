import { Workplace } from "../../../models/workplace-model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-workplace",
  templateUrl: "./workplace.component.html",
  styleUrls: ["./workplace.component.scss"],
})
export class WorkplaceComponent implements OnInit {
  @Input() workplace: Workplace;
  constructor() {}

  ngOnInit(): void {}
}
