// import { Component, OnInit } from '@angular/core';
// import { AccountService } from 'src/app/core/services/account.service';
// import { TrialBalance } from 'src/app/models/Account.model';

// @Component({
//   selector: 'app-trial-balance',
//   templateUrl: './trial-balance.component.html',
//   styleUrls: ['./trial-balance.component.css']
// })
// export class TrialBalanceComponent implements OnInit {
//   entries: TrialBalance[] = [];
//   loading = false;

//   filter = {
//     fromDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
//     toDate: new Date().toISOString().split('T')[0]
//   };

//   constructor(private accountService: AccountService) {}

//   ngOnInit(): void { this.loadData(); }

//   loadData(): void {
//     this.loading = true;
//     this.accountService.getTrialBalance(this.filter).subscribe({
//       next: (data) => { this.entries = data; this.loading = false; },
//       error: () => { this.loading = false; }
//     });
//   }

//   get totalDebit(): number { return this.entries.reduce((s, e) => s + e.totalDebit, 0); }
//   get totalCredit(): number { return this.entries.reduce((s, e) => s + e.totalCredit, 0); }
//   get isBalanced(): boolean { return Math.abs(this.totalDebit - this.totalCredit) < 0.01; }

//   getTypeClass(type: string): string {
//     const map: Record<string, string> = {
//       'Asset': 'type-asset', 'Liability': 'type-liability',
//       'Equity': 'type-equity', 'Income': 'type-income', 'Expense': 'type-expense'
//     };
//     return map[type] || '';
//   }
// }