import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { SalesInvoice } from 'src/app/models/sales-invoice.model';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.css']
})
export class SalesReportsComponent implements OnInit {

  invoiceList: SalesInvoice[] = [];
  filteredList: SalesInvoice[] = [];
  fromDate = '';
  toDate = '';
  totalAmount = 0;

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.salesService.getAll().subscribe(res => {
      this.invoiceList = res;
      this.filteredList = res;
      this.calcTotal();
    });
  }

  filter() {
    this.filteredList = this.invoiceList.filter(inv => {
      const d = new Date(inv.invoiceDate);
      const from = this.fromDate ? new Date(this.fromDate) : null;
      const to = this.toDate ? new Date(this.toDate) : null;
      return (!from || d >= from) && (!to || d <= to);
    });
    this.calcTotal();
  }

  calcTotal() {
    this.totalAmount = this.filteredList.reduce((s, i) => s + (i.totalAmount || 0), 0);
  }

  reset() {
    this.fromDate = ''; this.toDate = '';
    this.filteredList = this.invoiceList;
    this.calcTotal();
  }
}