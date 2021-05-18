import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";

import { Workplace } from "../models/workplace-model";
import { Order } from "./../models/order.model";
import * as WorkplacesActions from "../store/workplaces/workplaces.actions";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class WorkplaceService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMovies(simulationState: AppState) {
    this.addOrderLogic(
      simulationState.orders.orders,
      simulationState.workplaces.workplaces
    );
  }

  private addOrderLogic(orders: Order[], workplaces: Workplace[]) {
    const waitingOrders = this.getWaitingOrders(orders);
    const emptyWorkplaces = this.getEmptyWorkPlaces(workplaces);
    for (
      let i = 0;
      i < waitingOrders.length && i < emptyWorkplaces.length;
      i++
    ) {
      this.store.dispatch(
        new WorkplacesActions.AddOrderToWorkplace({
          order: waitingOrders[i],
          workplaceId: emptyWorkplaces[i].id,
        })
      );
    }
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
    return workplaces;
  }
}
