import { Observable } from "rxjs";
import { Workplace } from "../../models/workPlace-model";
import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-workplaces",
  templateUrl: "./workplaces.component.html",
  styleUrls: ["./workplaces.component.scss"],
})
export class WorkplacesComponent implements OnInit {
  workplaces: Observable<Workplace[]>;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.workplaces = this.store.select((state) => state.workplaces.workplaces);
  }
}
