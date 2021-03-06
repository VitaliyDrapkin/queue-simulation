import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StartPageComponent } from "./start-page.component";

const routes: Routes = [{ path: "start", component: StartPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StartPageRoutingModule {}
