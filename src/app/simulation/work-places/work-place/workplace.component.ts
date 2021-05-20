import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Workplace } from "../../../models/workPlace-model";
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
    this.currentTime = this.store.select((state) => state.simulation.step);
  }

  calculateCreatingTime() {
    let timeLeft = 0;
    this.workplace.product.ingredients.forEach((ingredient) => {
      timeLeft = timeLeft + ingredient.creatingTime;
    });
    return timeLeft;
  }
}
