import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WareHouseCreationComponent } from './ware-house-creation.component';

const routes: Routes = [
  { path: '', component: WareHouseCreationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WareHouseCreationRoutingModule { }