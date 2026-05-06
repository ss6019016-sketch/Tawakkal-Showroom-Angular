import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { Account, Voucher } from 'src/app/models/Account.model';

@Component({
  selector: 'app-receipt-voucher',
  templateUrl: './receipt-voucher.component.html',
  styleUrls: ['./receipt-voucher.component.css']
})
export class ReceiptVoucherComponent implements OnInit {

  // VoucherType.Payment = 1
  readonly VOUCHER_TYPE = 2;

  voucher: Voucher = this.getEmpty();
  voucherList: Voucher[] = [];
  accountList: Account[] = [];
  editMode = false;
  activeTab: 'form' | 'list' = 'form';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadVouchers();
    this.loadAccounts();
    this.loadNextNo();
  }

  loadVouchers() {
    this.accountService.getVouchersByType(this.VOUCHER_TYPE).subscribe({
      next: res => this.voucherList = res
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: res => this.accountList = res
    });
  }

  loadNextNo() {
    if (!this.editMode) {
      this.accountService.getNextVoucherNo(this.VOUCHER_TYPE).subscribe(
        no => this.voucher.voucherNo = no
      );
    }
  }

  addEntry() {
    this.voucher.entries.push({
      accountId: '', description: '', debit: 0, credit: 0
    });
  }

  removeEntry(i: number) {
    this.voucher.entries.splice(i, 1);
    this.calcTotal();
  }

  calcTotal() {
    this.voucher.totalAmount = this.voucher.entries.reduce(
      (s, e) => s + e.debit, 0
    );
  }

  getTotalDebit()  { return this.voucher.entries.reduce((s, e) => s + e.debit, 0); }
  getTotalCredit() { return this.voucher.entries.reduce((s, e) => s + e.credit, 0); }
  isBalanced()     { return this.getTotalDebit() === this.getTotalCredit(); }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.voucher.entries.length < 2) { alert('Kam se kam 2 entries chahiye!'); return; }
    if (!this.isBalanced()) { alert('Debit aur Credit equal nahi hain!'); return; }

    if (this.editMode && this.voucher.id) {
      this.accountService.updateVoucher(this.voucher).subscribe(() => {
        this.loadVouchers(); this.reset(); this.activeTab = 'list';
      });
    } else {
      this.accountService.createVoucher(this.voucher).subscribe(() => {
        this.loadVouchers(); this.reset(); this.activeTab = 'list';
      });
    }
  }

  editVoucher(v: Voucher) {
    this.voucher = {
      ...v,
      voucherDate: v.voucherDate ? v.voucherDate.substring(0, 10) : '',
      entries: v.entries.map(e => ({ ...e }))
    };
    this.editMode = true;
    this.activeTab = 'form';
  }

  deleteVoucher(id: string) {
    if (!confirm('Delete karna chahte ho?')) return;
    this.accountService.deleteVoucher(id).subscribe(() => this.loadVouchers());
  }

  reset() {
    this.voucher = this.getEmpty();
    this.editMode = false;
    this.loadNextNo();
  }

  getEmpty(): Voucher {
    return {
      voucherType: this.VOUCHER_TYPE,
      voucherDate: new Date().toISOString().substring(0, 10),
      description: '',
      totalAmount: 0,
      entries: []
    };
  }
}