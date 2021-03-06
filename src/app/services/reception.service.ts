import { Product } from "./../models/product.model";
import { ReceptionStatuses } from "./../enums/ReceptionStatuses";
import { Reception } from "../models/reception.model";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as ReceptionsActions from "../store/receptions/receptions.actions";
import * as OrdersActions from "../store/orders/orders.actions";

import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";

@Injectable({
  providedIn: "root",
})
export class ReceptionService {
  constructor(public store: Store<fromApp.AppState>) {}

  checkMoves(appState: AppState) {
    this.addNewCustomer(
      appState.simulation.currentTime,
      appState.receptions.lastCustomerInTime,
      appState.receptions.newCustomerFrequency,
      !!appState.receptions.newCustomers.length
    );

    this.startGetOrderFromCustomer(
      appState.simulation.currentTime,
      appState.receptions.receptions
    );
    this.addNewOrder(
      appState.receptions.receptions,
      appState.simulation.currentTime,
      appState.orders.orders,
      appState.businessData.products
    );

    this.endGetOrderFromCustomer(
      appState.simulation.currentTime,
      appState.receptions.receptions,
      appState.orders.orders
    );

    this.moveQueue(appState.receptions.receptions);
  }

  private addNewCustomer(
    currentTime: number,
    lastCustomerTime: number,
    newCustomerFrequency: number,
    hasNewCustomers: boolean
  ) {
    if (
      hasNewCustomers &&
      currentTime - lastCustomerTime >= newCustomerFrequency
    ) {
      this.store.dispatch(
        new ReceptionsActions.addCustomerToQueue({ currentTime })
      );
    }
  }

  private startGetOrderFromCustomer(
    currentTime: number,
    receptions: Reception[]
  ) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].customersInQueue.length &&
        receptions[i].currentOccupation === ReceptionStatuses.Empty &&
        !receptions[i].hasCompletedCustomer
      ) {
        this.store.dispatch(
          new ReceptionsActions.startGetOrder({ queueIndex: i, currentTime })
        );
      }
    }
  }

  private endGetOrderFromCustomer(
    currentTime: number,
    receptions: Reception[],
    orders: Order[]
  ) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].currentOccupation === ReceptionStatuses.GettingOrder &&
        receptions[i].getOrderTime + receptions[i].startedGetOrderTime <=
          currentTime
      ) {
        const firstCustomerOrderId =
          receptions[i].customersInQueue[0].customerOrder.id;

        orders.forEach((order) => {
          if (order.id == firstCustomerOrderId) {
            this.store.dispatch(new ReceptionsActions.endGetOrder(i));
          }
        });
      }
    }
  }

  private moveQueue(receptions: Reception[]) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].currentOccupation ===
        ReceptionStatuses.WaitingNextCustomer
      ) {
        this.store.dispatch(new ReceptionsActions.moveQueue(i));
      }
    }
  }

  private addNewOrder(
    receptions: Reception[],
    currentTime: number,
    orders: Order[],
    products: Product[]
  ) {
    for (let i = 0; i < receptions.length; i++) {
      if (
        receptions[i].currentOccupation === ReceptionStatuses.GettingOrder &&
        receptions[i].getOrderTime + receptions[i].startedGetOrderTime <=
          currentTime
      ) {
        let isOrderAlreadyExist = false;
        const firstCustomer = receptions[i].customersInQueue[0];
        orders.forEach((order) => {
          if (order.id === firstCustomer.id) {
            isOrderAlreadyExist = true;
          }
        });
        if (!isOrderAlreadyExist) {
          const orderProducts = firstCustomer.customerOrder.productsIds.map(
            (productId) => {
              const productFromBusinessData = products.filter(
                (product) => product.id === productId
              );
              return productFromBusinessData[0];
            }
          );
          const newOrder = new Order(
            firstCustomer.id,
            firstCustomer.name,
            orderProducts
          );
          this.store.dispatch(new OrdersActions.addOrder(newOrder));
        }
      }
    }
  }
}
