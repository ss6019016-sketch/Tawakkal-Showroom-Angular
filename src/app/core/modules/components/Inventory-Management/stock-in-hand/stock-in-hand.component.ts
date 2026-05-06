import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { Warehouse, StockInHand } from 'src/app/models/inventory.model';

@Component({
  selector: 'app-stock-in-hand',
  templateUrl: './stock-in-hand.component.html',
  styleUrls: ['./stock-in-hand.component.css']
})
export class StockInHandComponent implements OnInit {
  stocks: StockInHand[] = [];
  warehouseList: Warehouse[] = [];
  selectedWarehouseId = '';
  totalValue = 0;

  constructor(private inventoryService: InventoryService) {}
  ngOnInit() { this.loadWarehouses(); this.load(); }

  loadWarehouses() { this.inventoryService.getWarehouses().subscribe(res => this.warehouseList = res); }

  load() {
    this.inventoryService.getStockInHand(this.selectedWarehouseId || undefined).subscribe(res => {
      this.stocks = res;
      this.totalValue = res.reduce((s, x) => s + x.stockValue, 0);
    });
  }
}
