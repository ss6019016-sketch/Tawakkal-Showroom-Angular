import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMasterComponent } from './customer-master.component';

const routes: Routes = [
  { path: '', component: CustomerMasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMasterRoutingModule { }