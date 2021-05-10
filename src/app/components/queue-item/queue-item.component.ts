import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-queue-item",
  templateUrl: "./queue-item.component.html",
  styleUrls: ["./queue-item.component.scss"],
})
export class QueueItemComponent implements OnInit {
  customers = [1, 2, 3];
  constructor() {}

  ngOnInit(): void {}
}
