import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import {  Account, VoucherEntry } from 'src/app/models/Account.model';

@Component({
  selector: 'app-accounts-report',
  templateUrl: './accounts-report.component.html',
  styleUrls: ['./accounts-report.component.css']
})
export class AccountsReportComponent implements OnInit {

  activeReport: 'trial' | 'ledger' = 'trial';

  // Trial Balance
  trialBalance: Account[] = [];
  totalDebit = 0;
  totalCredit = 0;

  // Ledger
  accountList: Account[] = [];
  selectedAccountId = '';
  ledgerEntries: VoucherEntry[] = [];
  ledgerDebit = 0;
  ledgerCredit = 0;
  fromDate = '';
  toDate = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadTrialBalance();
    this.loadAccounts();
  }

  loadTrialBalance() {
    this.accountService.getTrialBalance().subscribe(res => {
      this.trialBalance = res;
      this.totalDebit  = res.filter(a => [1,5].includes(a.accountType)).reduce((s,a) => s + (a.balance||0), 0);
      this.totalCredit = res.filter(a => [2,3,4].includes(a.accountType)).reduce((s,a) => s + (a.balance||0), 0);
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe(res => this.accountList = res);
  }

  loadLedger() {
    if (!this.selectedAccountId) return;
    this.accountService.getLedger(this.selectedAccountId, this.fromDate || undefined, this.toDate || undefined)
      .subscribe(res => {
        this.ledgerEntries = res;
        this.ledgerDebit  = res.reduce((s, e) => s + e.debit, 0);
        this.ledgerCredit = res.reduce((s, e) => s + e.credit, 0);
      });
  }

  getByType(type: number) {
    return this.trialBalance.filter(a => a.accountType === type && (a.balance||0) !== 0);
  }
}