// =============================================
// MODULE MODEL
// =============================================
export interface AppModule {
  id?: string;
  tenantId: string;
  name: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
}

// =============================================
// PAGE MODEL
// =============================================
export interface AppPage {
  pageId?: string;
  tenantId: string;
  moduleId: string;
  parentId?: string | null;
  title: string;
  path: string;
  type?: string;
  icon?: string;
  isCollapsed: boolean;
  isHidden: boolean;
  description?: string;
  link?: string;
  serialNumber: number;
  canView?: boolean;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

// =============================================
// MODULE + PAGES GROUPED DTO
// =============================================
export interface ModulePageDto {
  moduleId: string;
  tenantId: string;
  moduleName: string;
  moduleIcon?: string;
  pages: AppPage[];
}