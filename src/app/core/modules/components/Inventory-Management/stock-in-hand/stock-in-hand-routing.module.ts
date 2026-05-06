import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockInHandComponent } from './stock-in-hand.component';

const routes: Routes = [
  { path: '', component: StockInHandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockInHandRoutingModule { }