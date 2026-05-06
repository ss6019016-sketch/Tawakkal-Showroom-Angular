import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ProductService } from 'src/app/core/services/product.service';
import { DealerRate } from 'src/app/models/inventory.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-dealer-rate-list',
  templateUrl: './dealer-rate-list.component.html',
  styleUrls: ['./dealer-rate-list.component.css']
})
export class DealerRateListComponent implements OnInit {
  dealerRate: DealerRate = this.getEmpty();
  dealerRates: DealerRate[] = [];
  productList: Product[] = [];
  editMode = false; editId: string | null = null;

  constructor(private inventoryService: InventoryService, private productService: ProductService) {}

  ngOnInit() {
    this.load();
    this.productService.getAll().subscribe(res => this.productList = res);
  }

  load() { this.inventoryService.getDealerRates().subscribe(res => this.dealerRates = res); }

  onProductSelect(productId: string) {
    const p = this.productList.find(x => x.id === productId);
    if (p) this.dealerRate.rate = p.rate;
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.editMode && this.editId) {
      this.dealerRate.id = this.editId;
      this.inventoryService.updateDealerRate(this.dealerRate).subscribe(() => { this.load(); this.reset(); });
    } else {
      this.inventoryService.createDealerRate(this.dealerRate).subscribe(() => { this.load(); this.reset(); });
    }
  }

  edit(dr: DealerRate) { this.dealerRate = { ...dr }; this.editMode = true; this.editId = dr.id!; }
  delete(id: string) {
    if (!confirm('Delete?')) return;
    this.inventoryService.deleteDealerRate(id).subscribe(() => this.load());
  }
  reset() { this.dealerRate = this.getEmpty(); this.editMode = false; this.editId = null; }
  getEmpty(): DealerRate { return { productId: '', dealerName: '', rate: 0, notes: '' }; }
}
