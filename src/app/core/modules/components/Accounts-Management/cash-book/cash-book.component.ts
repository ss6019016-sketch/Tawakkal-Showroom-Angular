import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { VoucherEntry } from 'src/app/models/Account.model';

@Component({
  selector: 'app-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.css']
})
export class CashBookComponent implements OnInit {

  entries: VoucherEntry[] = [];
  fromDate = '';
  toDate = '';
  totalDebit = 0;
  totalCredit = 0;
  balance = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.accountService.getCashBook(this.fromDate || undefined, this.toDate || undefined).subscribe({
      next: res => {
        this.entries = res;
        this.calcTotals();
      }
    });
  }

  calcTotals() {
    this.totalDebit  = this.entries.reduce((s, e) => s + e.debit, 0);
    this.totalCredit = this.entries.reduce((s, e) => s + e.credit, 0);
    this.balance     = this.totalDebit - this.totalCredit;
  }

  filter() { this.load(); }

  reset() {
    this.fromDate = '';
    this.toDate   = '';
    this.load();
  }
}