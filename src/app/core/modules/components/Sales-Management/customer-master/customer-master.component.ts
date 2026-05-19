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
  paginatedCustomers: Customer[] = [];

  editMode = false;
  editId: number | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.customerService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.customerList = res;
      },
      error: (err) => console.error(err)
    });
  }

  onPageChange(data: Customer[]) {
    this.paginatedCustomers = data;
  }

  onSubmit(form: any) {

    if (form.invalid) return;

    if (this.editMode && this.editId) {

      this.customer.customerId = this.editId;

      this.customerService.update(this.customer).subscribe({
        next: () => {
          this.load();
          this.reset();
        },
        error: (err) => console.error(err)
      });

    } else {

      this.customerService.create(this.customer).subscribe({
        next: () => {
          this.load();
          this.reset();
        },
        error: (err) => console.error(err)
      });

    }
  }

  edit(c: Customer) {

    this.customer = { ...c };

    this.editMode = true;

    this.editId = c.customerId!;
  }

  delete(id: number) {

    if (!confirm('Customer delete karna chahte ho?')) return;

    this.customerService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  reset() {

    this.customer = this.getEmpty();

    this.editMode = false;

    this.editId = null;
  }

  getEmpty(): Customer {

    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };
  }
}