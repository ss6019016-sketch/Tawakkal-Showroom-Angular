import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StockLedger, Warehouse } from 'src/app/models/inventory.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-inventory-reports',
  templateUrl: './inventory-reports.component.html',
  styleUrls: ['./inventory-reports.component.css']
})
export class InventoryReportsComponent implements OnInit {
  ledger: StockLedger[] = [];
  warehouseList: Warehouse[] = [];
  productList: Product[] = [];
  selectedProductId = '';
  selectedWarehouseId = '';
  totalIn = 0; totalOut = 0; balance = 0;

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.inventoryService.getWarehouses().subscribe(res => this.warehouseList = res);
    this.productService.getAll().subscribe(res => this.productList = res);
    this.load();
  }

  load() {
    this.inventoryService.getStockLedger(
      this.selectedProductId || undefined,
      this.selectedWarehouseId || undefined
    ).subscribe(res => {
      this.ledger = res;
      this.totalIn  = res.reduce((s, x) => s + x.qtyIn, 0);
      this.totalOut = res.reduce((s, x) => s + x.qtyOut, 0);
      this.balance  = this.totalIn - this.totalOut;
    });
  }

  txLabel(type: number): string {
    const map: any = { 1:'Purchase In', 2:'Sales Out', 3:'Adj In', 4:'Adj Out', 5:'Return In', 6:'Return Out' };
    return map[type] || 'Unknown';
  }

  txColor(type: number): string {
    return [1,3,5].includes(type) ? 'bg-success' : 'bg-danger';
  }
}
