import { OrdersEditorService } from "./../../../services/ordersEditor.service";
import { Observable } from "rxjs";
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
  isSimulationPlaying: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private orderEditorService: OrdersEditorService
  ) {}

  ngOnInit(): void {
    this.isSimulationPlaying = this.store.select(
      (state) => state.simulation.isSimulationPlaying
    );
  }

  onEditOrder() {
    this.orderEditorService.changeOrder(
      this.order.products,
      this.order.id,
      this.order.customerName
    );
  }
}
