import { Observable } from "rxjs";
import { Ingredient } from "./../models/ingredient.model";
import { Simulation } from "./../models/simulation.model";
import { Product } from "./../models/product.model";
import * as fromApp from "../store/app.reducer";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class OrdersEditorService {
  isModalWindowOpen: boolean = false;
  isEditMode: boolean;
  products: Observable<Product>;
  constructor(public store: Store<fromApp.AppState>) {}

  startEditOrder() {
    this.isModalWindowOpen = true;
    this.isEditMode = true;
  }

  startCreateOrder() {
    this.isModalWindowOpen = true;
    this.isEditMode = false;
  }

  closeModalWindow() {
    this.isModalWindowOpen = false;
  }

  save() {
    if (this.isEditMode) {
      this.editOrder();
    } else {
      this.addOrder();
    }
  }

  editOrder() {}

  addOrder() {}
}
