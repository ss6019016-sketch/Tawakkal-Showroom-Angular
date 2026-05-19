import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
})
export class ProductMasterComponent implements OnInit {

  product: Product = this.getEmpty();
  productList: Product[] = [];

  editMode = false;
  editId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productService.getAll().subscribe({
      next: res => this.productList = res
    });
  }

  onSubmit(form: any) {
    if (form.invalid) return;

    if (this.editMode && this.editId) {
      this.product.productId = this.editId;

      this.productService.update(this.product).subscribe(() => {
        this.load();
        this.reset();
      });

    } else {

      this.productService.create(this.product).subscribe(() => {
        this.load();
        this.reset();
      });

    }
  }

  edit(p: Product) {
    this.product = { ...p };
    this.editMode = true;
    this.editId = p.productId;
  }

  delete(id: number) {
    if (!confirm('Product delete karna chahte ho?')) return;

    this.productService.delete(id.toString()).subscribe(() => this.load());
  }

  reset() {
    this.product = this.getEmpty();
    this.editMode = false;
    this.editId = null;
  }
getEmpty(): Product {
  return {
    productId: 0,
    tenantId: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: 0,
    categoryName: '',
    stockQty: 0,
    unit: '',
    status: true,
    createdDate: ''
  };
}
}