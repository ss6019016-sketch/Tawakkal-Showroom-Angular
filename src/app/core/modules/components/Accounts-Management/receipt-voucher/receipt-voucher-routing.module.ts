import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptVoucherComponent } from './receipt-voucher.component';

const routes: Routes = [
  { path: '', component: ReceiptVoucherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptVoucherRoutingModule { }