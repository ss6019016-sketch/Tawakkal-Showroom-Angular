import { Injectable } from '@angular/core';

export interface ModulePermission {
  module: string;
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

@Injectable({ providedIn: 'root' })
export class PermissionService {

  private permissions: ModulePermission[] = [];

  // Login ke baad call karo
  load(permissions: ModulePermission[]): void {
    this.permissions = permissions;
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  // App start par restore karo
  restore(): void {
    const raw = localStorage.getItem('permissions');
    this.permissions = raw ? JSON.parse(raw) : [];
  }

  // Main check method
  can(module: string, action: 'view' | 'add' | 'edit' | 'delete'): boolean {
    if (this.isSuperAdmin()) return true;

    const perm = this.permissions.find(
      p => p.module.toLowerCase() === module.toLowerCase()
    );
    if (!perm) return false;

    switch (action) {
      case 'view':   return perm.canView;
      case 'add':    return perm.canAdd;
      case 'edit':   return perm.canEdit;
      case 'delete': return perm.canDelete;
      default:       return false;
    }
  }

  canView(module: string):   boolean { return this.can(module, 'view'); }
  canAdd(module: string):    boolean { return this.can(module, 'add'); }
  canEdit(module: string):   boolean { return this.can(module, 'edit'); }
  canDelete(module: string): boolean { return this.can(module, 'delete'); }

  isSuperAdmin(): boolean {
    return localStorage.getItem('isSuperAdmin') === 'true';
  }

  getAll(): ModulePermission[] { return this.permissions; }

  clear(): void {
    this.permissions = [];
    localStorage.removeItem('permissions');
  }
}