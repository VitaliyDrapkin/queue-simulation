import { OrderEditorModal } from "./../simulation/order-editor-modal/order-editor-modal.component";
import { Order } from "src/app/models/order.model";
import { take } from "rxjs/operators";
import * as OrdersActions from "./../store/orders/orders.actions";
import * as BusinessDataActions from "./../store/businessData/businessData.actions";
import { Observable } from "rxjs";
import { Product } from "./../models/product.model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class OrdersEditorService {
  isModalWindowOpen: boolean = false;
  products: Observable<Product>;
  constructor(
    public store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {}

  startCreateOrder() {
    this.store.dispatch(new BusinessDataActions.startCreateOrder());
    this.openModalWindowEditorOrder();
  }

  startEditOrder(orderProducts: Product[], editOrderId: number) {
    this.store.dispatch(
      new BusinessDataActions.startEditOrder({ orderProducts, editOrderId })
    );
    this.openModalWindowEditorOrder();
  }

  openModalWindowEditorOrder(): void {
    const dialogRef = this.dialog.open(OrderEditorModal, {
      width: "100rem",
      height: "80rem",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.isSave) {
        this.saveChanges();
      }
    });
  }

  saveChanges(): void {
    this.store
      .select("businessData")
      .pipe(take(1))
      .subscribe((state) => {
        if (state.isEditMode) {
          const newOrder = new Order(
            state.editOrderId,
            state.orderEditorProducts
          );
          this.store.dispatch(
            new OrdersActions.editOrder({
              newOrder: newOrder,
              editedOrderId: state.editOrderId,
            })
          );
        } else {
          const newOrder = new Order(
            new Date().getTime(),
            state.orderEditorProducts
          );
          this.store.dispatch(new OrdersActions.addOrder(newOrder));
        }
      });
  }
}
