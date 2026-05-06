import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {

  customer: Customer = this.getEmpty();
  customerList: Customer[] = [];
  editMode = false;
  editId: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.customerService.getAll().subscribe({
      next: (res) => this.customerList = res,
      error: (err) => console.error(err)
    });
  }

  onSubmit(form: any) {
    if (form.invalid) return;

    if (this.editMode && this.editId) {
      this.customer.id = this.editId;
      this.customerService.update(this.customer).subscribe(() => {
        this.load(); this.reset();
      });
    } else {
      this.customerService.create(this.customer).subscribe(() => {
        this.load(); this.reset();
      });
    }
  }

  edit(c: Customer) {
    this.customer = { ...c };
    this.editMode = true;
    this.editId = c.id!;
  }

  delete(id: string) {
    if (!confirm('Customer delete karna chahte ho?')) return;
    this.customerService.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.customer = this.getEmpty();
    this.editMode = false;
    this.editId = null;
  }

  getEmpty(): Customer {
    return { name: '', email: '', phone: '', city: '', address: '' };
  }
}