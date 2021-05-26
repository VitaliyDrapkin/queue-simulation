import { changeOrderStatus } from "./../store/orders/orders.actions";
import { Delivery } from "./../models/delivery.model";
import { Workplace } from "../models/workplace-model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import * as DeliveriesActions from "../store/deliveries/deliveries.actions";
import * as OrdersActions from "../store/orders/orders.actions";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { OrderStatuses } from "../enums/OrderStatuses";

@Injectable({
  providedIn: "root",
})
export class DeliveryService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMoves(appState: AppState) {
    this.finishDelivery(
      appState.deliveries.deliveries,
      appState.simulation.currentTime
    );
  }

  finishDelivery(deliveries: Delivery[], currentTime: number) {
    deliveries.forEach((delivery, index) => {
      if (
        delivery.order &&
        delivery.deliveryTime + delivery.deliveryStartTime < currentTime
      ) {
        this.store.dispatch(
          new DeliveriesActions.removeOrderFromDelivery({
            deliveryIndex: index,
          })
        );
        this.store.dispatch(
          new OrdersActions.changeOrderStatus({
            status: OrderStatuses.Completed,
            orderId: delivery.order.id,
          })
        );
      }
    });
  }
}
