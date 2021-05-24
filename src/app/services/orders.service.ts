import { Delivery } from "./../models/delivery.model";
import { OrderStatuses } from "./../enums/OrderStatuses";
import { Product } from "./../models/product.model";
import { Workplace } from "./../models/workplace-model";
import * as OrdersActions from "./../store/orders/orders.actions";
import * as WorkplacesActions from "./../store/workplaces/workplaces.actions";
import * as DeliveryActions from "./../store/deliveries/deliveries.actions";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMoves(appState: AppState) {
    this.addOrderToProduction(
      appState.orders.orders,
      appState.workplaces.workplaces,
      appState.simulation.step
    );

    this.addOrderToDelivery(
      appState.orders.orders,
      appState.deliveries.deliveries,
      appState.simulation.step
    );
  }

  private addOrderToProduction(
    orders: Order[],
    workplaces: Workplace[],
    currentTime: number
  ) {
    const waitingForWorkplaceOrders = this.getWaitingForWorkplaceOrders(orders);
    const emptyWorkplaces = this.getEmptyWorkPlaces(workplaces);
    for (
      let i = 0;
      i < waitingForWorkplaceOrders.length && i < emptyWorkplaces.length;
      i++
    ) {
      this.store.dispatch(
        new WorkplacesActions.AddOrderToWorkplace({
          order: waitingForWorkplaceOrders[i],
          workplaceId: emptyWorkplaces[i].id,
          currentTime: currentTime,
        })
      );
      this.store.dispatch(
        new OrdersActions.changeOrderStatus({
          status: OrderStatuses.Creating,
          orderId: waitingForWorkplaceOrders[i].id,
        })
      );
    }
  }

  private getWaitingForWorkplaceOrders(orders: Order[]): Order[] {
    return orders.filter(
      (order) => order.status === OrderStatuses.WaitingForWorkPlace
    );
  }

  private getEmptyWorkPlaces(workplaces: Workplace[]): Workplace[] {
    return workplaces.filter((workplace) => !workplace.order);
  }

  addOrderToDelivery(orders: Order[], deliveries: Delivery[], step: number) {
    const waitingForDeliveryOrders = this.getWaitingForDeliveriesOrders(orders);
    const emptyDeliveries = this.getEmptyDeliveries(deliveries);
    for (
      let i = 0;
      i < waitingForDeliveryOrders.length && i < emptyDeliveries.length;
      i++
    ) {
      this.store.dispatch(
        new DeliveryActions.addOrderToDelivery({
          order: waitingForDeliveryOrders[i],
          deliveryId: emptyDeliveries[i].id,
          currentTime: step,
        })
      );
      this.store.dispatch(
        new OrdersActions.changeOrderStatus({
          status: OrderStatuses.InDelivery,
          orderId: waitingForDeliveryOrders[i].id,
        })
      );
    }
  }

  private getWaitingForDeliveriesOrders(orders: Order[]): Order[] {
    return orders.filter(
      (order) => order.status === OrderStatuses.WaitingForDelivery
    );
  }

  private getEmptyDeliveries(deliveries: Delivery[]): Delivery[] {
    return deliveries.filter((delivery) => !delivery.order);
  }
}
