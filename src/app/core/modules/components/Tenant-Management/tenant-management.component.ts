import { Component, OnInit } from '@angular/core';
import { TenantService } from 'src/app/core/services/tenant.service';
import { Tenant } from 'src/app/models/user.model';

@Component({
  selector: 'app-tenant-management',
  templateUrl: './tenant-management.component.html',
  styleUrls: ['./tenant-management.component.css']
})
export class TenantManagementComponent implements OnInit {

  tenant: Tenant = this.empty();
  tenantList: Tenant[] = [];
  editMode = false;
  editId: string | null = null;
  successMsg = '';
  errorMsg = '';

  constructor(private tenantService: TenantService) {}

  ngOnInit() { this.load(); }

  load() {
    this.tenantService.getAllTenants().subscribe({
      next: res => this.tenantList = res,
      error: () => this.errorMsg = 'Load failed'
    });
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    this.errorMsg = '';

    if (this.editMode && this.editId) {
      this.tenant.id = this.editId;
      this.tenantService.updateTenant(this.tenant).subscribe({
        next: () => { this.load(); this.reset(); this.flash('Updated!'); },
        error: err => this.errorMsg = err.error?.message || 'Error'
      });
    } else {
      this.tenantService.createTenant(this.tenant).subscribe({
        next: () => { this.load(); this.reset(); this.flash('Branch added!'); },
        error: err => this.errorMsg = err.error?.message || 'Error'
      });
    }
  }

  edit(t: Tenant) {
    this.tenant = { ...t };
    this.editMode = true;
    this.editId = t.id!;
    this.errorMsg = '';
  }

  delete(id: string) {
    if (!confirm('Delete karna chahte ho?')) return;
    this.tenantService.deleteTenant(id).subscribe(() => this.load());
  }

  flash(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000);
  }

  reset() {
    this.tenant = this.empty();
    this.editMode = false;
    this.editId = null;
    this.errorMsg = '';
  }

  empty(): Tenant {
    return { name: '', code: '', address: '', phone: '', email: '' };
  }
}