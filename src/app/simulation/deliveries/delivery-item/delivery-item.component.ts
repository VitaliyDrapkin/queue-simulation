import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Delivery } from "./../../../models/delivery.model";
import { Component, Input, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-delivery-item",
  templateUrl: "./delivery-item.component.html",
  styleUrls: ["./delivery-item.component.scss"],
})
export class DeliveryItemComponent implements OnInit {
  @Input() delivery: Delivery;
  step: Observable<number>;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.step = this.store.select((state) => state.simulation.step);
  }
}
