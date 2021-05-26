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
  isSimulationPlaying: Observable<boolean>;
  isSimulationInit: Observable<boolean>;
  orders: Observable<Order[]>;

  constructor(
    private orderEditorService: OrdersEditorService,
    public dialog: MatDialog,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isSimulationPlaying = this.store.select(
      (state) => state.simulation.isSimulationPlaying
    );
    this.isSimulationInit = this.store.select(
      (state) => state.simulation.isSimulationInit
    );

    // this.store.subscribe((data) =>
    //   console.log("[InformationComponent]  changeState()", data)
    // );
  }

  onAddOrder(): void {
    const dialogRef = this.dialog.open(OrderEditorModal, {
      width: "100rem",
      height: "80rem",
      data: { orders: this.orders },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
