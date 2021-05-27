import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Customer } from "./../../../models/Customer.model";
import { Reception } from "./../../../models/reception.model";
import { Component, Input, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-reception-item",
  templateUrl: "./reception-item.component.html",
  styleUrls: ["./reception-item.component.scss"],
})
export class ReceptionItemComponent implements OnInit {
  @Input() reception: Reception;
  customers: Customer[];
  currentTime: Observable<number>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.customers = this.reception.customersInQueue;
    this.currentTime = this.store.select(
      (state) => state.simulation.currentTime
    );
  }
}
