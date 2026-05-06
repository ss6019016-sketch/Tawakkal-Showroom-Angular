import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { Warehouse } from 'src/app/models/inventory.model';

@Component({
  selector: 'app-ware-house-creation',
  templateUrl: './ware-house-creation.component.html',
  styleUrls: ['./ware-house-creation.component.css']
})
export class WareHouseCreationComponent implements OnInit {
  warehouse: Warehouse = this.getEmpty();
  warehouseList: Warehouse[] = [];
  editMode = false; editId: string | null = null;

  constructor(private inventoryService: InventoryService) {}
  ngOnInit() { this.load(); }

  load() { this.inventoryService.getWarehouses().subscribe(res => this.warehouseList = res); }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.editMode && this.editId) {
      this.warehouse.id = this.editId;
      this.inventoryService.updateWarehouse(this.warehouse).subscribe(() => { this.load(); this.reset(); });
    } else {
      this.inventoryService.createWarehouse(this.warehouse).subscribe(() => { this.load(); this.reset(); });
    }
  }

  edit(w: Warehouse) { this.warehouse = { ...w }; this.editMode = true; this.editId = w.id!; }

  delete(id: string) {
    if (!confirm('Delete?')) return;
    this.inventoryService.deleteWarehouse(id).subscribe(() => this.load());
  }

  reset() { this.warehouse = this.getEmpty(); this.editMode = false; this.editId = null; }
  getEmpty(): Warehouse { return { name: '', location: '', description: '', isDefault: false }; }
}
