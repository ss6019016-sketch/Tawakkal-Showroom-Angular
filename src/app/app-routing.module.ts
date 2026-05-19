import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './core/modules/components/Setup-Management/users/users.component';
import { VenderMasterComponent } from './core/modules/components/Purchase-Management/vender-master/vender-master.component';
import { PurchaseBillPostingComponent } from './core/modules/components/Purchase-Management/purchase-bill-posting/purchase-bill-posting.component';
import { PurchaseReturnComponent } from './core/modules/components/Purchase-Management/purchase-return/purchase-return.component';
import { PurchaseReportsComponent } from './core/modules/components/Purchase-Management/purchase-reports/purchase-reports.component';
import { CustomerMasterComponent } from './core/modules/components/Sales-Management/customer-master/customer-master.component';
import { SalesInvoiceComponent } from './core/modules/components/Sales-Management/sales-invoice/sales-invoice.component';
import { SalesReturnComponent } from './core/modules/components/Sales-Management/sales-return/sales-return.component';
import { SalesReportsComponent } from './core/modules/components/Sales-Management/sales-reports/sales-reports.component';
import { PaymentVoucherComponent } from './core/modules/components/Accounts-Management/payment-voucher/payment-voucher.component';
import { ChartOfAccountComponent } from './core/modules/components/Accounts-Management/chart-of-account/chart-of-account.component';
import { ReceiptVoucherComponent } from './core/modules/components/Accounts-Management/receipt-voucher/receipt-voucher.component';
import { CashBookComponent } from './core/modules/components/Accounts-Management/cash-book/cash-book.component';
import { AccountsReportComponent } from './core/modules/components/Accounts-Management/accounts-report/accounts-report.component';
import { WareHouseCreationComponent } from './core/modules/components/Inventory-Management/ware-house-creation/ware-house-creation.component';
import { ItemRegistrationComponent } from './core/modules/components/Inventory-Management/item-registration/item-registration.component';
import { StockInHandComponent } from './core/modules/components/Inventory-Management/stock-in-hand/stock-in-hand.component';
import { InventoryReportsComponent } from './core/modules/components/Inventory-Management/inventory-reports/inventory-reports.component';
import { StockAdjustmentComponent } from './core/modules/components/Inventory-Management/stock-adjustment/stock-adjustment.component';
import { DealerRateListComponent } from './core/modules/components/Inventory-Management/dealer-rate-list/dealer-rate-list.component';
import { DashboardComponent } from './core/modules/auth/dashboard/dashboard.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ProductMasterComponent } from './core/modules/components/Sales-Management/product-master/product-master.component';
import { JournalVoucherComponent } from './core/modules/components/Accounts-Management/journal-voucher/journal-voucher.component';
import { TenantManagementComponent } from './core/modules/components/Tenant-Management/tenant-management.component';
import { RoleManagementComponent } from './core/modules/components/Setup-Management/role-management/role-management.component';
import { ModuleManagementComponent } from './core/modules/components/Setup-Management/mudule-management/module-management.component';

const routes: Routes = [
  // Auth Routes — no guard
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/modules/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  // Main App Routes — no guard (AuthGuard removed)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard',          component: DashboardComponent },

      // Setup Management
      { path: 'users',              component: UsersComponent },
      { path: 'roles',              component: RoleManagementComponent },
      { path: 'tenant',             component: TenantManagementComponent },
      { path: 'module-management',  component: ModuleManagementComponent },

      // Purchase Management
      { path: 'vendor-master',          component: VenderMasterComponent },
      { path: 'purchase-bill-posting',  component: PurchaseBillPostingComponent },
      { path: 'purchase-return',        component: PurchaseReturnComponent },
      { path: 'purchase-reports',       component: PurchaseReportsComponent },

      // Sales Management
      { path: 'customer-master',  component: CustomerMasterComponent },
      { path: 'sales-invoice',    component: SalesInvoiceComponent },
      { path: 'sales-return',     component: SalesReturnComponent },
      { path: 'sales-reports',    component: SalesReportsComponent },
      { path: 'product-master',   component: ProductMasterComponent },

      // Accounts Management
      { path: 'chart-of-account',  component: ChartOfAccountComponent },
      { path: 'payment-voucher',   component: PaymentVoucherComponent },
      { path: 'receipt-voucher',   component: ReceiptVoucherComponent },
      { path: 'accounts-report',   component: AccountsReportComponent },
      { path: 'cash-book',         component: CashBookComponent },
      { path: 'journal-voucher',   component: JournalVoucherComponent },

      // Inventory Management
      { path: 'warehouse',         component: WareHouseCreationComponent },
      { path: 'item-registration', component: ItemRegistrationComponent },
      { path: 'stock-in-hand',     component: StockInHandComponent },
      { path: 'inventory-reports', component: InventoryReportsComponent },
      { path: 'stock-adjustment',  component: StockAdjustmentComponent },
      { path: 'dealer-rate-list',  component: DealerRateListComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }