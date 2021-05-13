import { Reception } from "./../../models/reception.model";
import { Store } from "@ngrx/store";
import { AppState } from "./../../store/app.reducer";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-receptions",
  templateUrl: "./receptions.component.html",
  styleUrls: ["./receptions.component.scss"],
})
export class ReceptionsComponent implements OnInit {
  newCustomersLength: Observable<number>;
  receptions: Observable<Reception[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.newCustomersLength = this.store.select(
      (state) => state.receptions.newCustomers.length
    );
    this.receptions = this.store.select((state) => state.receptions.receptions);
  }
}
