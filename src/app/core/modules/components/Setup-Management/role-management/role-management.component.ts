import { Component, OnInit } from '@angular/core';
import { TenantService } from 'src/app/core/services/tenant.service';
import { Role, RolePermission, Tenant } from 'src/app/models/user.model';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  tenantList: Tenant[] = [];
  roleList: Role[] = [];
  moduleList: string[] = [];

  selectedTenantId = '';
  editMode = false;
  editId: string | null = null;
  showForm = false;
  successMsg = '';
  errorMsg = '';

  role: Role = this.emptyRole();

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    this.tenantService.getAllTenants().subscribe(res => {
      this.tenantList = res;
      if (res.length > 0) {
        this.selectedTenantId = res[0].id!;
        this.loadRoles();
      }
    });

    this.tenantService.getModules().subscribe(res => {
      this.moduleList = res.map(m => typeof m === 'string' ? m : (m as any).name || (m as any).module || '');
    });
  }

  loadRoles() {
    if (!this.selectedTenantId) return;
    this.tenantService.getRolesByTenant(this.selectedTenantId).subscribe({
      next: res => this.roleList = res.map(role => ({
        ...role,
        permissions: this.normalizePermissions(role.permissions)
      }))
    });
  }

  onTenantChange() {
    this.loadRoles();
    this.cancelForm();
  }

  newRole() {
    this.role = this.emptyRole();
    this.role.tenantId = this.selectedTenantId;
    // Initialize permissions for all modules
    this.role.permissions = this.moduleList.map(m => ({
      module: this.getModuleString(m), canView: false, canAdd: false, canEdit: false, canDelete: false
    }));
    this.editMode = false;
    this.editId = null;
    this.showForm = true;
    this.errorMsg = '';
  }

  editRole(r: Role) {
    this.tenantService.getRoleById(r.id!).subscribe(full => {
      this.role = { ...full };
      this.role.permissions = this.normalizePermissions(this.role.permissions);
      // Ensure all modules are present
      this.moduleList.forEach(m => {
        if (!this.role.permissions.find(p => p.module === m)) {
          this.role.permissions.push({
            module: m, canView: false, canAdd: false, canEdit: false, canDelete: false
          });
        }
      });
      this.editMode = true;
      this.editId = r.id!;
      this.showForm = true;
      this.errorMsg = '';
    });
  }

  // Toggle all actions for a module
  toggleAll(perm: RolePermission, checked: boolean) {
    perm.canView = checked;
    perm.canAdd  = checked;
    perm.canEdit = checked;
    perm.canDelete = checked;
  }

  isAllChecked(perm: RolePermission): boolean {
    return perm.canView && perm.canAdd && perm.canEdit && perm.canDelete;
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    this.errorMsg = '';
    this.role.permissions = this.normalizePermissions(this.role.permissions);
    const payload = this.prepareRolePayload(this.role);

    if (this.editMode && this.editId) {
      this.role.id = this.editId;
      this.tenantService.updateRole(payload).subscribe({
        next: () => { this.loadRoles(); this.cancelForm(); this.flash('Role updated!'); },
        error: err => this.errorMsg = err.error?.message || 'Error'
      });
    } else {
      this.tenantService.createRole(payload).subscribe({
        next: () => { this.loadRoles(); this.cancelForm(); this.flash('Role created!'); },
        error: err => this.errorMsg = err.error?.message || 'Error'
      });
    }
  }

  delete(id: string) {
    if (!confirm('Role delete karna chahte ho?')) return;
    this.tenantService.deleteRole(id).subscribe(() => this.loadRoles());
  }

  cancelForm() {
    this.showForm = false;
    this.editMode = false;
    this.editId = null;
    this.role = this.emptyRole();
    this.errorMsg = '';
  }

  flash(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000);
  }

  emptyRole(): Role {
    return {
      tenantId: this.selectedTenantId || '',
      name: '',
      description: '',
      permissions: []
    };
  }

  getPermCount(r: Role): number {
    return r.permissions?.filter(p => p.canView).length || 0;
  }

  getModuleString(module: string | object): string {
    if (typeof module === 'string') return module;
    if (!module || typeof module !== 'object') return '';
    return (
      (module as any).name ||
      (module as any).module ||
      (module as any).title ||
      (module as any).label ||
      (module as any).id ||
      ''
    );
  }

  normalizePermissions(permissions: RolePermission[]): RolePermission[] {
    return permissions.map(p => ({
      ...p,
      module: this.getModuleString(p.module)
    }));
  }

  prepareRolePayload(role: Role): Role {
    return {
      ...role,
      permissions: role.permissions.map(p => ({
        id: p.id,
        module: this.getModuleString(p.module),
        canView: p.canView,
        canAdd: p.canAdd,
        canEdit: p.canEdit,
        canDelete: p.canDelete
      }))
    };
  }
}
