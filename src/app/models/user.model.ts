export interface AppUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
    role?: string;
  isActive?: boolean;
  createdOn?: string;
}


export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  name: string;
  email: string;
  roleName: string;
  userId: string;
  tenantId: string;
  tenantName: string;
  isSuperAdmin: boolean;
  permissions: ModulePermission[];
  availableTenants: Tenant[];
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface Tenant {
  id?: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
}
export interface Role {
  id?: string;
  tenantId: string;
  tenantName?: string;
  name: string;
  description?: string;
  permissions: RolePermission[];
}

export interface RolePermission {
  id?: string;
  module: string;
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface ModulePermission {
  module: string;
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface UserTenantInfo {
  tenantId: string;
  tenantName?: string;
  roleId: string;
  roleName?: string;
}