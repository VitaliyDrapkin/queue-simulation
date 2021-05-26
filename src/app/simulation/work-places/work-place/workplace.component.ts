import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Workplace } from "../../../models/workplace-model";
import { Component, Input, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-workplace",
  templateUrl: "./workplace.component.html",
  styleUrls: ["./workplace.component.scss"],
})
export class WorkplaceComponent implements OnInit {
  @Input() workplace: Workplace;
  currentTime: Observable<number>;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentTime = this.store.select(
      (state) => state.simulation.currentTime
    );
  }

  calculateCreatingTime() {
    let timeLeft = 1; //+1 delay time for view
    this.workplace.order.products[
      this.workplace.currentProductIndex
    ].ingredients.forEach((ingredient) => {
      timeLeft = timeLeft + ingredient.delayTime;
    });
    return timeLeft;
  }
}
