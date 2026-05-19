import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StockAdjustment, StockAdjustmentItem, Warehouse } from 'src/app/models/inventory.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.css']
})
export class StockAdjustmentComponent implements OnInit {
  adjustment: StockAdjustment = this.getEmpty();
  adjustmentList: StockAdjustment[] = [];
  warehouseList: Warehouse[] = [];
  productList: Product[] = [];
  activeTab: 'form' | 'list' = 'form';

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadAdjustments();
    this.inventoryService.getWarehouses().subscribe(res => this.warehouseList = res);
    this.productService.getAll().subscribe(res => this.productList = res);
    this.loadNextNo();
  }

  loadAdjustments() {
    this.inventoryService.getAdjustments().subscribe(res => this.adjustmentList = res);
  }

  loadNextNo() {
    this.inventoryService.getNextAdjNo().subscribe(no => this.adjustment.adjustmentNo = no);
  }

  addItem() {
    this.adjustment.items.push({ productId: '', qtyIn: 0, qtyOut: 0, rate: 0, notes: '' });
  }

  onProductSelect(index: number, productId: string) {
    const p = this.productList.find(x => x.productId === Number(productId));
    if (p) { this.adjustment.items[index].rate = p.price; }
  }

  removeItem(i: number) { this.adjustment.items.splice(i, 1); }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.adjustment.items.length === 0) { alert('Kam se kam ek item add karo!'); return; }
    this.inventoryService.createAdjustment(this.adjustment).subscribe(() => {
      this.loadAdjustments(); this.reset(); this.activeTab = 'list';
    });
  }

  delete(id: string) {
    if (!confirm('Delete?')) return;
    this.inventoryService.deleteAdjustment(id).subscribe(() => this.loadAdjustments());
  }

  reset() { this.adjustment = this.getEmpty(); this.loadNextNo(); }

  getEmpty(): StockAdjustment {
    return { adjustmentDate: new Date().toISOString().substring(0, 10), warehouseId: '', notes: '', items: [] };
  }
}
