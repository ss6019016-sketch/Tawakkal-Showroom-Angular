import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenderMasterComponent } from './vender-master.component';

const routes: Routes = [
  { path: '', component: VenderMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenderMasterRoutingModule { }