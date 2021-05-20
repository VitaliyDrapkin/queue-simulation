import { OrderStatuses } from "./../enums/OrderStatuses";
import { Product } from "./../models/product.model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

import { Workplace } from "../models/workplace-model";
import { Order } from "./../models/order.model";
import * as WorkplacesActions from "../store/workplaces/workplaces.actions";
import * as OrdersActions from "../store/orders/orders.actions";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class WorkplaceService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMovies(simulationState: AppState) {
    this.addProduct(
      simulationState.orders.orders,
      simulationState.workplaces.workplaces,
      simulationState.simulation.step
    );
  }

  private addProduct(
    orders: Order[],
    workplaces: Workplace[],
    currentTime: number
  ) {
    const waitingForWorkplaceProducts = this.getWaitingProducts(orders);
    const emptyWorkplaces = this.getEmptyWorkPlaces(workplaces);
    for (
      let i = 0;
      i < waitingForWorkplaceProducts.length && i < emptyWorkplaces.length;
      i++
    ) {
      this.store.dispatch(
        new WorkplacesActions.AddOrderToWorkplace({
          product: waitingForWorkplaceProducts[i].product,
          orderId: waitingForWorkplaceProducts[i].orderId,
          workplaceId: emptyWorkplaces[i].id,
          currentTime: currentTime,
        })
      );
      this.store.dispatch(
        new OrdersActions.changeOrderStatus({
          status: OrderStatuses.Creating,
          orderId: waitingForWorkplaceProducts[i].orderId,
        })
      );
    }
  }

  private getWaitingProducts(
    orders: Order[]
  ): { orderId: number; product: Product }[] {
    const waitingOrders = this.getWaitingOrders(orders);
    const waitingProducts: { orderId: number; product: Product }[] = [];

    waitingOrders.forEach((order) => {
      order.products.forEach((product) => {
        if (!product.isCreated) {
          waitingProducts.push({ orderId: order.id, product: { ...product } });
        }
      });
    });
    return waitingProducts;
  }

  private getWaitingOrders(orders: Order[]): Order[] {
    const waitingOrders: Order[] = [];
    orders.forEach((order) => {
      if (order.status === "Waiting for workplace") {
        waitingOrders.push(order);
      }
    });
    return waitingOrders;
  }

  private getEmptyWorkPlaces(workplaces: Workplace[]): Workplace[] {
    const emptyWorkplaces: Workplace[] = [];
    workplaces.forEach((workplace) => {
      if (workplace.isEmpty) {
        emptyWorkplaces.push(workplace);
      }
    });
    return emptyWorkplaces;
  }
}
