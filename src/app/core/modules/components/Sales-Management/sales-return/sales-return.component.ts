import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { SalesInvoice } from 'src/app/models/sales-invoice.model';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent implements OnInit {

  invoiceList: SalesInvoice[] = [];
  selectedInvoice: SalesInvoice | null = null;
  selectedInvoiceId = '';
  returnItems: { productName: string; returnQty: number; rate: number; }[] = [];
  returnTotal = 0;
  returnNote = '';

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.salesService.getAll().subscribe(res => this.invoiceList = res);
  }

  onInvoiceSelect() {
    const inv = this.invoiceList.find(i => i.id === this.selectedInvoiceId);
    if (inv) {
      this.selectedInvoice = inv;
      this.returnItems = inv.items.map(i => ({
        productName: i.productName,
        returnQty: 0,
        rate: i.rate
      }));
      this.calcTotal();
    }
  }

  calcTotal() {
    this.returnTotal = this.returnItems.reduce((s, i) => s + (i.returnQty * i.rate), 0);
  }

  submit() {
    if (this.returnItems.every(i => i.returnQty === 0)) {
      alert('Kam se kam ek item ki return qty daalo!'); return;
    }
    alert(`Sales Return submit! Total: ${this.returnTotal}`);
    this.resetForm();
  }

  resetForm() {
    this.selectedInvoice = null;
    this.selectedInvoiceId = '';
    this.returnItems = [];
    this.returnTotal = 0;
    this.returnNote = '';
  }
}