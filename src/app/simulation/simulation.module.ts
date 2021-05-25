import { OrderEditorModal } from "./order-editor-modal/order-editor-modal.component";
import { WorkplaceComponent } from "./work-places/work-place/workplace.component";
import { WorkplacesComponent } from "./work-places/workplaces.component";
import { DeliveryItemComponent } from "./deliveries/delivery-item/delivery-item.component";
import { InformationComponent } from "./information/information.component";
import { ReceptionItemComponent } from "./receptions/reception-item/reception-item.component";
import { ReceptionsComponent } from "./receptions/receptions.component";
import { OrderItemComponent } from "./orders/order-item/order-item.component";
import { OrdersComponent } from "./orders/orders.component";
import { DeliveriesComponent } from "./deliveries/deliveries.component";
import { SimulationComponent } from "./simulation.component";
import { SimulationRoutingModule } from "./simulation-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { PlayMenuComponent } from "./information/play-menu/play-menu.component";
import { ModalProductItemComponent } from './order-editor-modal/modal-product-item/modal-product-item.component';
import { OrderInformationFormComponent } from './order-editor-modal/order-information-form/order-information-form.component';

@NgModule({
  declarations: [
    SimulationComponent,
    OrdersComponent,
    OrderItemComponent,
    WorkplacesComponent,
    WorkplaceComponent,
    ReceptionsComponent,
    ReceptionItemComponent,
    DeliveriesComponent,
    ReceptionItemComponent,
    InformationComponent,
    DeliveryItemComponent,
    PlayMenuComponent,
    OrderEditorModal,
    ModalProductItemComponent,
    OrderInformationFormComponent,
  ],
  imports: [SharedModule, SimulationRoutingModule],
})
export class SimulationModule {}
