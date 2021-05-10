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
import { OrderItemComponent } from "./components/order-item/order-item.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { WorkPlacesComponent } from "./components/work-places/work-places.component";
import { ReceptionsComponent } from "./components/receptions/receptions.component";
import { DeliveriesComponent } from "./components/deliveries/deliveries.component";
import { WorkPlaceComponent } from "./components/work-place/work-place.component";
import { ReceptionItemComponent } from "./components/reception-item/reception-item.component";

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SimulationPageComponent,
    OrderItemComponent,
    OrdersComponent,
    WorkPlacesComponent,
    ReceptionsComponent,
    DeliveriesComponent,
    WorkPlaceComponent,
    ReceptionItemComponent,
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
