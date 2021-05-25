import { OrdersEditorService } from "./../../../services/ordersEditor.service";
import { Product } from "./../../../models/product.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-product-item",
  templateUrl: "./modal-product-item.component.html",
  styleUrls: ["./modal-product-item.component.scss"],
})
export class ModalProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  @Input() count: number;

  constructor(public orderEditorService: OrdersEditorService) {}

  ngOnInit(): void {}

  increase() {
    this.orderEditorService.productsCount[this.index]++;
  }
  decrease() {
    if (this.count) {
      this.orderEditorService.productsCount[this.index]--;
    }
  }
}
