  import { DealerRateListComponent } from './core/modules/components/Inventory-Management/dealer-rate-list/dealer-rate-list.component';
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { HttpClientModule } from '@angular/common/http';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { SharedModule } from './shared.module';
  import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
  import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
  import { VenderMasterComponent } from './core/modules/components/Purchase-Management/vender-master/vender-master.component';
  import { PurchaseBillPostingComponent } from './core/modules/components/Purchase-Management/purchase-bill-posting/purchase-bill-posting.component';
  import { PurchaseReportsComponent } from './core/modules/components/Purchase-Management/purchase-reports/purchase-reports.component';
  import { PurchaseReturnComponent } from './core/modules/components/Purchase-Management/purchase-return/purchase-return.component';
  import { CustomerMasterComponent } from './core/modules/components/Sales-Management/customer-master/customer-master.component';
  import { SalesInvoiceComponent } from './core/modules/components/Sales-Management/sales-invoice/sales-invoice.component';
  import { SalesReportsComponent } from './core/modules/components/Sales-Management/sales-reports/sales-reports.component';
  import { SalesReturnComponent } from './core/modules/components/Sales-Management/sales-return/sales-return.component';
  import { ProductMasterComponent } from './core/modules/components/Sales-Management/product-master/product-master.component';
  import { ChartOfAccountComponent } from './core/modules/components/Accounts-Management/chart-of-account/chart-of-account.component';
  import { PaymentVoucherComponent } from './core/modules/components/Accounts-Management/payment-voucher/payment-voucher.component';
  import { ReceiptVoucherComponent } from './core/modules/components/Accounts-Management/receipt-voucher/receipt-voucher.component';
  import { AccountsReportComponent } from './core/modules/components/Accounts-Management/accounts-report/accounts-report.component';
  import { CashBookComponent } from './core/modules/components/Accounts-Management/cash-book/cash-book.component';
  import { JournalVoucherComponent } from './core/modules/components/Accounts-Management/journal-voucher/journal-voucher.component';
  import { AccountFilterPipe } from './account-filter-pipe/Account-filter.pipe';
  import { WareHouseCreationComponent } from './core/modules/components/Inventory-Management/ware-house-creation/ware-house-creation.component';
  import { StockInHandComponent } from './core/modules/components/Inventory-Management/stock-in-hand/stock-in-hand.component';
  import { StockAdjustmentComponent } from './core/modules/components/Inventory-Management/stock-adjustment/stock-adjustment.component';
  import { ItemRegistrationComponent } from './core/modules/components/Inventory-Management/item-registration/item-registration.component';
  import { InventoryReportsComponent } from './core/modules/components/Inventory-Management/inventory-reports/inventory-reports.component';
  import { RolesComponent } from './core/modules/components/Setup-Management/roles/roles.component';
  import { UsersComponent } from './core/modules/components/Setup-Management/users/users.component';
  import { NavbarComponent } from './core/modules/components/navbar/navbar.component';
  import { SidebarComponent } from './core/modules/components/sidebar/sidebar.component';
  import { DashboardComponent } from './core/modules/auth/dashboard/dashboard.component';
  import { PaginationComponent } from './shared/pagination/pagination.component';

  @NgModule({
    declarations: [
      AppComponent,
        AuthLayoutComponent,
      MainLayoutComponent,
      VenderMasterComponent,
      PurchaseBillPostingComponent,
      PurchaseReportsComponent,
      PurchaseReturnComponent,
      CustomerMasterComponent,
      SalesInvoiceComponent,
      SalesReportsComponent,
      SalesReturnComponent,
      ProductMasterComponent,
      ChartOfAccountComponent,
      PaymentVoucherComponent,
      ReceiptVoucherComponent,
      AccountsReportComponent,
      CashBookComponent,
      JournalVoucherComponent,
      AccountFilterPipe,
      WareHouseCreationComponent,
      StockInHandComponent,
      StockAdjustmentComponent,
      ItemRegistrationComponent,
      InventoryReportsComponent,
      DealerRateListComponent,
      RolesComponent,
      UsersComponent,
      NavbarComponent,
      SidebarComponent,
      DashboardComponent,
      PaginationComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      SharedModule,
    
  ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
