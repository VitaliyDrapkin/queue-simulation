import { WorkPlaceComponent } from "./work-places/work-place/work-place.component";
import { WorkPlacesComponent } from "./work-places/work-places.component";
import { ReceptionItemComponent } from "./receptions/reception-item/reception-item.component";
import { ReceptionsComponent } from "./receptions/receptions.component";
import { OrderItemComponent } from "./orders/order-item/order-item.component";
import { OrdersComponent } from "./orders/orders.component";
import { DeliveriesComponent } from "./deliveries/deliveries.component";
import { SimulationComponent } from "./simulation.component";
import { SimulationRoutingModule } from "./simulation-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    SimulationComponent,
    OrdersComponent,
    OrderItemComponent,
    WorkPlacesComponent,
    WorkPlaceComponent,
    ReceptionsComponent,
    ReceptionItemComponent,
    DeliveriesComponent,
    ReceptionItemComponent,
  ],
  imports: [SharedModule, SimulationRoutingModule],
})
export class SimulationModule {}
