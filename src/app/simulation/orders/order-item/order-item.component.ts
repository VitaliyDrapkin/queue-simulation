import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Order } from "./../../../models/order.model";
import { Component, OnInit, Input } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  test: Observable<any>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.test = this.store.select("orders");
    this.test.subscribe(() => console.log("test"));
  }
}
