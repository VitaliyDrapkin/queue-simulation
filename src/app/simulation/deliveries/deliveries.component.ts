import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Delivery } from "./../../models/delivery.model";
import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-deliveries",
  templateUrl: "./deliveries.component.html",
  styleUrls: ["./deliveries.component.scss"],
})
export class DeliveriesComponent implements OnInit {
  deliveries: Observable<Delivery[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.deliveries = this.store.select((state) => state.deliveries.deliveries);
  }
}
