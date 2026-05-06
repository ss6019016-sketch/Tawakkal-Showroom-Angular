import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseBillPostingComponent } from './purchase-bill-posting.component';

const routes: Routes = [
  { path: '', component: PurchaseBillPostingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseBillPostingRoutingModule { }