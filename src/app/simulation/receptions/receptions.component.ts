import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-receptions",
  templateUrl: "./receptions.component.html",
  styleUrls: ["./receptions.component.scss"],
})
export class ReceptionsComponent implements OnInit {
  queues = [1, 2];

  constructor() {}

  ngOnInit(): void {}
}
