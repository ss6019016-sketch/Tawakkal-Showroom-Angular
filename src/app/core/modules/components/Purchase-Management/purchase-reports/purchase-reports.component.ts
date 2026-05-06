import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { PurchaseBill } from 'src/app/models/purchase-bill.model';

@Component({
  selector: 'app-purchase-reports',
  templateUrl: './purchase-reports.component.html',
  styleUrls: ['./purchase-reports.component.css']
})
export class PurchaseReportsComponent implements OnInit {

  billList: PurchaseBill[] = [];
  filteredList: PurchaseBill[] = [];
  fromDate: string = '';
  toDate: string = '';
  totalAmount: number = 0;
  showFilter: boolean = true; 

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.purchaseService.getAll().subscribe({
      next: (res) => {
        this.billList = res;
        this.filteredList = res;
        this.calcTotal();
      }
    });
  }

  filterByDate() {
    if (!this.fromDate && !this.toDate) {
      this.filteredList = this.billList;
    } else {
      this.filteredList = this.billList.filter(b => {
        const d = new Date(b.billDate);
        const from = this.fromDate ? new Date(this.fromDate) : null;
        const to = this.toDate ? new Date(this.toDate) : null;
        return (!from || d >= from) && (!to || d <= to);
      });
    }
    this.calcTotal();
  }

  calcTotal() {
    this.totalAmount = this.filteredList.reduce((s, b) => s + (b.totalAmount || 0), 0);
  }

  resetFilter() {
    this.fromDate = '';
    this.toDate = '';
    this.filteredList = this.billList;
    this.calcTotal();
  }

toggleFilter() {
  this.showFilter = !this.showFilter;
}
}