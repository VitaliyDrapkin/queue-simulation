import { OrderStatuses } from "./../enums/OrderStatuses";
import { Product } from "./../models/product.model";
import { Workplace } from "./../models/workplace-model";
import * as OrdersActions from "./../store/orders/orders.actions";
import * as WorkplacesActions from "./../store/workplaces/workplaces.actions";
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
  }

  private addOrderToProduction(
    orders: Order[],
    workplaces: Workplace[],
    currentTime: number
  ) {
    const waitingForWorkplaceOrders = this.getWaitingForWorkplaceOrders(orders);
    const emptyWorkplaces = this.getEmptyWorkPlaces(workplaces);
    console.log(waitingForWorkplaceOrders.length);
    console.log(emptyWorkplaces.length);
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
}
