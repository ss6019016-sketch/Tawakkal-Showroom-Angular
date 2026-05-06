import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SalesInvoice, SalesInvoiceItem } from 'src/app/models/sales-invoice.model';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { PrintService } from 'src/app/core/services/print.service';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {

  invoice: SalesInvoice = this.getEmpty();
  invoiceList: SalesInvoice[] = [];
  customerList: Customer[] = [];
  productList: Product[] = [];
  editMode = false;
  activeTab: 'form' | 'list' = 'form';

  constructor(
    private salesService: SalesService,
    private customerService: CustomerService,
    private productService: ProductService,
       private printService: PrintService
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.loadCustomers();
    this.loadProducts();
    this.loadNextInvoiceNo();
  }

  loadInvoices() {
    this.salesService.getAll().subscribe({ next: res => this.invoiceList = res });
  }
  loadCustomers() {
    this.customerService.getAll().subscribe({ next: res => this.customerList = res });
  }
  loadProducts() {
    this.productService.getAll().subscribe({ next: res => this.productList = res });
  }
  loadNextInvoiceNo() {
    if (!this.editMode)
      this.salesService.getNextInvoiceNo().subscribe(no => this.invoice.invoiceNo = no);
  }

  addItem() {
    this.invoice.items.push({ productName: '', description: '', qty: 1, rate: 0 });
  }

  onProductSelect(index: number, productId: string) {
    const product = this.productList.find(p => p.id === productId);
    if (product) {
      this.invoice.items[index].productName  = product.name;
      this.invoice.items[index].description = product.description || '';
      this.invoice.items[index].rate        = product.rate;
      this.calcTotal();
    }
  }

  removeItem(i: number) {
    this.invoice.items.splice(i, 1);
    this.calcTotal();
  }

  calcTotal() {
    this.invoice.totalAmount = this.invoice.items.reduce(
      (sum, item) => sum + (item.qty * item.rate), 0
    );
  }

  getAmount(item: SalesInvoiceItem): number {
    return item.qty * item.rate;
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.invoice.items.length === 0) { alert('Kam se kam ek item add karo!'); return; }
    this.calcTotal();

    if (this.editMode && this.invoice.id) {
      this.salesService.update(this.invoice).subscribe(() => {
        this.loadInvoices(); this.reset(); this.activeTab = 'list';
      });
    } else {
      this.salesService.create(this.invoice).subscribe(() => {
        this.loadInvoices(); this.reset(); this.activeTab = 'list';
      });
    }
  }

  editInvoice(inv: SalesInvoice) {
    this.invoice = {
      ...inv,
      invoiceDate: inv.invoiceDate ? inv.invoiceDate.substring(0, 10) : '',
      items: inv.items.map(i => ({ ...i }))
    };
    this.editMode = true;
    this.activeTab = 'form';
  }

  deleteInvoice(id: string) {
    if (!confirm('Invoice delete karna chahte ho?')) return;
    this.salesService.delete(id).subscribe(() => this.loadInvoices());
  }

  reset() {
    this.invoice = this.getEmpty();
    this.editMode = false;
    this.loadNextInvoiceNo();
  }

  getEmpty(): SalesInvoice {
    return {
      invoiceNo: '',
      invoiceDate: new Date().toISOString().substring(0, 10),
      customerId: '', notes: '', totalAmount: 0, items: []
    };
  }

  printInvoice(inv: SalesInvoice) {
  this.printService.printSalesInvoice(inv, {
    name:    'Sultan Tawakal Trading',
    address: 'Karachi, Pakistan',
    phone:   '0300-0000000',
    email:   'info@sultantawakal.com'
  });
}
}