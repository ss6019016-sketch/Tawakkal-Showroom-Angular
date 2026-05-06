import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-item-registration',
  templateUrl: './item-registration.component.html',
  styleUrls: ['./item-registration.component.css']
})
export class ItemRegistrationComponent implements OnInit {
  product: Product = this.getEmpty();
  productList: Product[] = [];
  editMode = false; editId: string | null = null;

  constructor(private productService: ProductService) {}
  ngOnInit() { this.load(); }

  load() { this.productService.getAll().subscribe(res => this.productList = res); }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.editMode && this.editId) {
      this.product.id = this.editId;
      this.productService.update(this.product).subscribe(() => { this.load(); this.reset(); });
    } else {
      this.productService.create(this.product).subscribe(() => { this.load(); this.reset(); });
    }
  }

  edit(p: Product) { this.product = { ...p }; this.editMode = true; this.editId = p.id!; }
  delete(id: string) {
    if (!confirm('Delete?')) return;
    this.productService.delete(id).subscribe(() => this.load());
  }
  reset() { this.product = this.getEmpty(); this.editMode = false; this.editId = null; }
  getEmpty(): Product { return { name: '', description: '', rate: 0, unit: '' }; }
}
