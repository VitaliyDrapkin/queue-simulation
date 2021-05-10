import { DemoMaterialModule } from "./material-module";
import { MatNativeDateModule } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartPageComponent } from "./components/start-page/start-page.component";
import { SimulationPageComponent } from "./components/simulation-page/simulation-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { QueueItemComponent } from "./components/queue-item/queue-item.component";
import { OrderItemComponent } from "./components/order-item/order-item.component";

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SimulationPageComponent,
    QueueItemComponent,
    OrderItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
