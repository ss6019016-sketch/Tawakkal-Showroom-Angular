import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerRateListComponent } from './dealer-rate-list.component';

const routes: Routes = [
  { path: '', component: DealerRateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRateListRoutingModule { }