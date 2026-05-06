import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashBookComponent } from './cash-book.component';

const routes: Routes = [
  { path: '', component: CashBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashBooktRoutingModule { }