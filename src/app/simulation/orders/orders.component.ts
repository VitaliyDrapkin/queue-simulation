import { AppState } from "src/app/store/app.reducer";
import { Store } from "@ngrx/store";
import { Order } from "./../../models/order.model";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  orders: Observable<Order[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.orders = this.store.select((state) => state.orders.orders);
  }
}
