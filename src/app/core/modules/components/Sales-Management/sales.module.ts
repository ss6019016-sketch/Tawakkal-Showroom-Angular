import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { ProductMasterComponent } from './product-master/product-master.component';

@NgModule({
  declarations: [
    CustomerMasterComponent,
    SalesInvoiceComponent,
    SalesReportsComponent,
    SalesReturnComponent,
    ProductMasterComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesModule { }