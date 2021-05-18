import { StatisticsRoutingModule } from "./statistics-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { StatisticsComponent } from "./statistics.component";

@NgModule({
  declarations: [StatisticsComponent],
  imports: [SharedModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
