import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesInvoiceComponent } from './sales-invoice.component';

const routes: Routes = [
  { path: '', component: SalesInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInvoiceRoutingModule { }