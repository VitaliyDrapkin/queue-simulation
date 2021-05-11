import { SharedModule } from "./shared/shared.module";
import { SimulationModule } from "./simulation/simulation.module";
import { StartPageModule } from "./start-page/start-page.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    SharedModule,
    RouterModule,
    AppRoutingModule,
    StartPageModule,
    SimulationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
