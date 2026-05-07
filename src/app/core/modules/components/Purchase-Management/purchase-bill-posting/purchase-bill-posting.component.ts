import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { ProductService } from 'src/app/core/services/product.service';
import { PurchaseBill, PurchaseBillItem } from 'src/app/models/purchase-bill.model';
import { Vendor } from 'src/app/models/vendor.model';
import { Product } from 'src/app/models/product.model';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-purchase-bill-posting',
  templateUrl: './purchase-bill-posting.component.html',
  styleUrls: ['./purchase-bill-posting.component.css']
})
export class PurchaseBillPostingComponent implements OnInit {

  bill: PurchaseBill = this.getEmpty();
  billList: PurchaseBill[] = [];
  vendorList: Vendor[] = [];
  productList: Product[] = [];
  editMode = false;
  activeTab: 'form' | 'list' = 'form';
paginatedBills: any[] = [];
  constructor(
    private purchaseService: PurchaseService,
    private vendorService: VendorService,
    private productService: ProductService,
    private printService: PrintService 
  ) {}

  ngOnInit(): void {
    this.loadBills();
    this.loadVendors();
    this.loadProducts();
    this.loadNextBillNo();
  }

  loadBills() {
    this.purchaseService.getAll().subscribe({ next: res => this.billList = res });
  }

  loadVendors() {
    this.vendorService.getAll().subscribe({ next: res => this.vendorList = res });
  }

  loadProducts() {
    this.productService.getAll().subscribe({ next: res => this.productList = res });
  }

  loadNextBillNo() {
    if (!this.editMode) {
      this.purchaseService.getNextBillNo().subscribe(no => this.bill.billNo = no);
    }
  }

  addItem() {
    this.bill.items.push({ productName: '', description: '', qty: 1, rate: 0 });
  }

  // Product dropdown se select hone par rate auto fill
  onProductSelect(index: number, productId: string) {
    const product = this.productList.find(p => p.id === productId);
    if (product) {
      this.bill.items[index].productName  = product.name;
      this.bill.items[index].description = product.description || '';
      this.bill.items[index].rate        = product.rate;
      this.calcTotal();
    }
  }

  removeItem(i: number) {
    this.bill.items.splice(i, 1);
    this.calcTotal();
  }

  calcTotal() {
    this.bill.totalAmount = this.bill.items.reduce(
      (sum, item) => sum + (item.qty * item.rate), 0
    );
  }

  getAmount(item: PurchaseBillItem): number {
    return item.qty * item.rate;
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.bill.items.length === 0) { alert('Kam se kam ek item add karo!'); return; }
    this.calcTotal();

    if (this.editMode && this.bill.id) {
      this.purchaseService.update(this.bill).subscribe(() => {
        this.loadBills(); this.reset(); this.activeTab = 'list';
      });
    } else {
      this.purchaseService.create(this.bill).subscribe(() => {
        this.loadBills(); this.reset(); this.activeTab = 'list';
      });
    }
  }

  editBill(b: PurchaseBill) {
    this.bill = {
      ...b,
      billDate: b.billDate ? b.billDate.substring(0, 10) : '',
      items: b.items.map(i => ({ ...i }))
    };
    this.editMode = true;
    this.activeTab = 'form';
  }

  deleteBill(id: string) {
    if (!confirm('Bill delete karna chahte ho?')) return;
    this.purchaseService.delete(id).subscribe(() => this.loadBills());
  }

  reset() {
    this.bill = this.getEmpty();
    this.editMode = false;
    this.loadNextBillNo();
  }

  getEmpty(): PurchaseBill {
    return {
      billNo: '',
      billDate: new Date().toISOString().substring(0, 10),
      vendorId: '', notes: '', totalAmount: 0, items: []
    };
  }

  printBill(bill: PurchaseBill) {
  this.printService.printPurchaseBill(bill, {
    name:    'Sultan Tawakal Trading',
    address: 'Karachi, Pakistan',
    phone:   '0300-0000000',
    email:   'info@sultantawakal.com'
  });
}

onPageChange(data: PurchaseBill[]) {
  this.paginatedBills = data;
}
}