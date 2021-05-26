import { OrdersEditorService } from "./../../services/ordersEditor.service";
import { Observable } from "rxjs";
import { Product } from "./../../models/product.model";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  // products: Product[];
}

@Component({
  selector: "app-order-editor",
  templateUrl: "order-editor-modal.component.html",
  styleUrls: ["./order-editor-modal.component.scss"],
})
export class OrderEditorModal implements OnInit {
  products: Product[];
  productCount: number[];
  constructor(
    public ordersEditorService: OrdersEditorService,
    public dialogRef: MatDialogRef<OrderEditorModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    // this.products = this.ordersEditorService.productsInSimulation;
    // this.productCount = this.ordersEditorService.productsCount;
    console.log(this.productCount);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close();
  }
}
