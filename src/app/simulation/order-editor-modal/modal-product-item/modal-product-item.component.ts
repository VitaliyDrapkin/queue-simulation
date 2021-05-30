import * as BusinessDataActions from "./../../../store/businessData/businessData.actions";
import { Store } from "@ngrx/store";
import { OrdersEditorService } from "./../../../services/ordersEditor.service";
import { Product } from "./../../../models/product.model";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-modal-product-item",
  templateUrl: "./modal-product-item.component.html",
  styleUrls: ["./modal-product-item.component.scss"],
})
export class ModalProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  @Input() count: number;
  @Output() clickEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    public orderEditorService: OrdersEditorService,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  onClick() {
    this.clickEvent.emit(this.product.id);
  }
}
