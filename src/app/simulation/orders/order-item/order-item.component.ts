import { Store } from "@ngrx/store";
import { Order } from "./../../../models/order.model";
import { Component, OnInit, Input } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
