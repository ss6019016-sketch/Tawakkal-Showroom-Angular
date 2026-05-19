import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtInterceptor } from './core/interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { NgZorroModule } from './ng-zorro.module';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { VenderMasterComponent } from './core/modules/components/Purchase-Management/vender-master/vender-master.component';
import { PurchaseBillPostingComponent } from './core/modules/components/Purchase-Management/purchase-bill-posting/purchase-bill-posting.component';
import { PurchaseReportsComponent } from './core/modules/components/Purchase-Management/purchase-reports/purchase-reports.component';
import { PurchaseReturnComponent } from './core/modules/components/Purchase-Management/purchase-return/purchase-return.component';
import { ChartOfAccountComponent } from './core/modules/components/Accounts-Management/chart-of-account/chart-of-account.component';
import { PaymentVoucherComponent } from './core/modules/components/Accounts-Management/payment-voucher/payment-voucher.component';
import { ReceiptVoucherComponent } from './core/modules/components/Accounts-Management/receipt-voucher/receipt-voucher.component';
import { AccountsReportComponent } from './core/modules/components/Accounts-Management/accounts-report/accounts-report.component';
import { CashBookComponent } from './core/modules/components/Accounts-Management/cash-book/cash-book.component';
import { JournalVoucherComponent } from './core/modules/components/Accounts-Management/journal-voucher/journal-voucher.component';
import { SalesModule } from './core/modules/components/Sales-Management/sales.module';
import { DealerRateListComponent } from './core/modules/components/Inventory-Management/dealer-rate-list/dealer-rate-list.component';
import { AccountFilterPipe } from './account-filter-pipe/Account-filter.pipe';
import { WareHouseCreationComponent } from './core/modules/components/Inventory-Management/ware-house-creation/ware-house-creation.component';
import { StockInHandComponent } from './core/modules/components/Inventory-Management/stock-in-hand/stock-in-hand.component';
import { StockAdjustmentComponent } from './core/modules/components/Inventory-Management/stock-adjustment/stock-adjustment.component';
import { ItemRegistrationComponent } from './core/modules/components/Inventory-Management/item-registration/item-registration.component';
import { InventoryReportsComponent } from './core/modules/components/Inventory-Management/inventory-reports/inventory-reports.component';
import { UsersComponent } from './core/modules/components/Setup-Management/users/users.component';
import { DashboardComponent } from './core/modules/auth/dashboard/dashboard.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { TenantManagementComponent } from './core/modules/components/Tenant-Management/tenant-management.component';
import { RoleManagementComponent } from './core/modules/components/Setup-Management/role-management/role-management.component';
import { ModuleManagementComponent } from './core/modules/components/Setup-Management/mudule-management/module-management.component';
import { ShellComponent } from './core/layouts/main-layout/shell.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    VenderMasterComponent,
    PurchaseBillPostingComponent,
    PurchaseReportsComponent,
    PurchaseReturnComponent,
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
    RoleManagementComponent,
    UsersComponent,
    ShellComponent,
    DashboardComponent,
    TenantManagementComponent,
    ModuleManagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    NgZorroModule,
    SalesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
