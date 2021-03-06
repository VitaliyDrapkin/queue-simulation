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

export interface DialogData {
  isSaveClicked: boolean;
}

@Component({
  selector: "app-order-editor",
  templateUrl: "order-editor-modal.component.html",
  styleUrls: ["./order-editor-modal.component.scss"],
})
export class OrderEditorModal implements OnInit {
  products: Observable<Product[]>;
  editOrderProducts: Observable<{ count: number; product: Product }[]>;
  orderEditForm: FormGroup;
  isEditMode: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<OrderEditorModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.orderEditForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null),
      phone: new FormControl(null),
      comment: new FormControl(null),
    });
    this.products = this.store.select((state) => state.businessData.products);
    this.editOrderProducts = this.store.select((state) => {
      return state.businessData.editOrderProducts;
    });
    this.isEditMode = this.store.select(
      (state) => state.businessData.isEditMode
    );
    this.store.select((state) =>
      this.orderEditForm.controls.name.setValue(
        state.businessData.editOrderCustomerName
      )
    );

    this.store
      .select("businessData")
      .pipe(take(1))
      .subscribe((state) => {
        this.orderEditForm.controls.name.setValue(state.editOrderCustomerName);
      });
  }

  addProductToSelected(productId: number) {
    this.store.dispatch(
      new BusinessDataActions.addSelectedProductToOrderEditor({
        productId: productId,
      })
    );
  }

  removeProductFromSelected(productId: number) {
    this.store.dispatch(
      new BusinessDataActions.RemoveSelectedProductFromOrderEditor({
        productId: productId,
      })
    );
  }

  onSave(): void {
    if (
      this.orderEditForm.controls.phone.value &&
      !Number.isSafeInteger(+this.orderEditForm.controls.phone.value)
    ) {
      this.orderEditForm.controls.phone.setErrors({ incorrect: true });
      return;
    }
    this.dialogRef.close({
      doSave: true,
      customerName: this.orderEditForm.controls.name.value,
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ doSave: false });
  }
}
