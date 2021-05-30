import { Store } from "@ngrx/store";
import { Order } from "src/app/models/order.model";
import { Observable } from "rxjs";
import { OrderEditorModal } from "./../order-editor-modal/order-editor-modal.component";
import { OrdersEditorService } from "../../services/ordersEditor.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent implements OnInit {
  orders: Observable<Order[]>;

  constructor(public dialog: MatDialog, public store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.subscribe((data) =>
    //   console.log("[InformationComponent]  changeState()", data)
    // );
  }
}
