import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/core/services/vendor.service';
import { Vendor } from 'src/app/models/vendor.model';

@Component({
  selector: 'app-vender-master',
  templateUrl: './vender-master.component.html',
  styleUrls: ['./vender-master.component.css']
})
export class VenderMasterComponent implements OnInit {

  vendor: Vendor = this.getEmptyVendor();
  vendorList: Vendor[] = [];

  editMode: boolean = false;
  editId: string | null = null;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  // ================= LOAD DATA =================
  loadVendors() {
    this.vendorService.getAll().subscribe({
      next: (res) => this.vendorList = res,
      error: (err) => console.error(err)
    });
  }

  // ================= SUBMIT =================
  onSubmit(form: any) {
    if (form.invalid) return;

    if (this.editMode && this.editId) {
      this.vendor.id = this.editId;

      this.vendorService.update(this.vendor).subscribe(() => {
        this.loadVendors();
        this.resetForm();
      });

    } else {
      this.vendorService.create(this.vendor).subscribe(() => {
        this.loadVendors();
        this.resetForm();
      });
    }
  }

  // ================= EDIT =================
  editVendor(v: Vendor) {
    this.vendor = { ...v };
    this.editMode = true;
    this.editId = v.id!;
  }

  // ================= DELETE =================
  deleteVendor(id: string) {
    if (!confirm('Are you sure?')) return;

    this.vendorService.delete(id).subscribe(() => {
      this.loadVendors();
    });
  }

  // ================= RESET =================
  resetForm() {
    this.vendor = this.getEmptyVendor();
    this.editMode = false;
    this.editId = null;
  }

  // ================= HELPER =================
  getEmptyVendor(): Vendor {
    return {
      name: '',
      email: '',
      phone: '',
      city: '',
      address: ''
    };
  }

}