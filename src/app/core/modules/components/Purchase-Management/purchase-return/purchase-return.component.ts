import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { PurchaseBill } from 'src/app/models/purchase-bill.model';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.css']
})
export class PurchaseReturnComponent implements OnInit {

  billList: PurchaseBill[] = [];
  selectedBill: PurchaseBill | null = null;
  selectedBillId: string = '';

  returnItems: { productName: string; returnQty: number; rate: number; }[] = [];
  returnTotal: number = 0;
  returnNote: string = '';

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getAll().subscribe(res => this.billList = res);
  }

  onBillSelect() {
    const bill = this.billList.find(b => b.id === this.selectedBillId);
    if (bill) {
      this.selectedBill = bill;
      this.returnItems = bill.items.map(i => ({
        productName: i.productName,
        returnQty: 0,
        rate: i.rate
      }));
      this.calcReturnTotal();
    }
  }

  calcReturnTotal() {
    this.returnTotal = this.returnItems.reduce((s, i) => s + (i.returnQty * i.rate), 0);
  }

  submitReturn() {
    if (!this.selectedBill) return;
    if (this.returnItems.every(i => i.returnQty === 0)) {
      alert('Kam se kam ek item ki return qty daalo!');
      return;
    }
    alert(`Return submit ho gaya! Total Return: ${this.returnTotal}`);
    this.resetReturn();
  }

  resetReturn() {
    this.selectedBill = null;
    this.selectedBillId = '';
    this.returnItems = [];
    this.returnTotal = 0;
    this.returnNote = '';
  }
}