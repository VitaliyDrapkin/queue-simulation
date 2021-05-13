import { SimulationEffects } from "./store/simulation/simulation.effects";
import * as fromApp from "./store/app.reducer";
import { SharedModule } from "./shared/shared.module";
import { SimulationModule } from "./simulation/simulation.module";
import { StartPageModule } from "./start-page/start-page.module";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    SharedModule,
    RouterModule,
    AppRoutingModule,
    StartPageModule,
    SimulationModule,
    EffectsModule.forRoot([SimulationEffects]),
    StoreModule.forRoot(fromApp.appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
