import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimulationPageComponent } from './components/simulation-page/simulation-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartPageComponent },
  { path: 'simulation', component: SimulationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
