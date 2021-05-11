import { SharedModule } from "./../shared/shared.module";
import { StartPageRoutingModule } from "./start-page-routing.module";
import { StartPageComponent } from "./start-page.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [StartPageComponent],
  imports: [SharedModule, StartPageRoutingModule],
})
export class StartPageModule {}
