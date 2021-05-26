import * as OrdersActions from "./../../store/orders/orders.actions";
import * as BusinessDataActions from "./../../store/businessData/businessData.actions";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Order } from "src/app/models/order.model";
import { Store } from "@ngrx/store";
import { OrdersEditorService } from "./../../services/ordersEditor.service";
import { Observable } from "rxjs";
import { Product } from "./../../models/product.model";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AppState } from "src/app/store/app.reducer";
import { map, take } from "rxjs/operators";

export interface DialogData {}

@Component({
  selector: "app-order-editor",
  templateUrl: "order-editor-modal.component.html",
  styleUrls: ["./order-editor-modal.component.scss"],
})
export class OrderEditorModal implements OnInit {
  products: Observable<Product[]>;
  orderEditorProducts: Observable<Product[]>;
  orderEditForm: FormGroup;

  constructor(
    public ordersEditorService: OrdersEditorService,
    public dialogRef: MatDialogRef<OrderEditorModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.orderEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      comment: new FormControl(null),
    });

    this.products = this.store.select((state) => state.businessData.products);
    this.orderEditorProducts = this.store.select(
      (state) => state.businessData.orderEditorProducts
    );
  }

  addProductToSelected(productId: number) {
    this.store.dispatch(
      new BusinessDataActions.addProductToSelected({ productId: productId })
    );
  }

  removeProductFromSelected(productId: number) {
    this.store.dispatch(
      new BusinessDataActions.RemoveSelectedProductFromOrderEditor({
        productId: productId,
      })
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!Number.isSafeInteger(+this.orderEditForm.controls.phone.value)) {
      this.orderEditForm.controls.phone.setErrors({ incorrect: true });
      return;
    }
    this.store
      .select("businessData")
      .pipe(take(1))
      .subscribe((state) => {
        const newOrder = new Order(
          +new Date().toString,
          state.orderEditorProducts
        );
        this.store.dispatch(new OrdersActions.addOrder(newOrder));
      });
    this.dialogRef.close();
  }
}
