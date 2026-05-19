import { Component, OnInit } from '@angular/core';
import { AppModule, AppPage } from 'src/app/models/Module.model';
import { ModuleService } from 'src/app/core/services/module.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { Tenant } from 'src/app/models/user.model';

@Component({
  selector: 'app-module-management',
  templateUrl: './module-management.component.html',
  styleUrls: ['./module-management.component.css']
})
export class ModuleManagementComponent implements OnInit {

  // =============================================
  // TENANT
  // =============================================
  tenantList: Tenant[] = [];
  selectedTenantId = '';

  // =============================================
  // MODULE STATE
  // =============================================
  moduleList: AppModule[] = [];
  module: AppModule = this.emptyModule();
  moduleEditMode = false;
  moduleEditId: string | null = null;
  showModuleForm = false;

  // =============================================
  // PAGE STATE
  // =============================================
  pageList: AppPage[] = [];
  page: AppPage = this.emptyPage();
  pageEditMode = false;
  pageEditId: string | null = null;
  showPageForm = false;
  selectedModuleForPages: AppModule | null = null;
  activeTab: 'modules' | 'pages' = 'modules';

  // =============================================
  // UI STATE
  // =============================================
  successMsg = '';
  errorMsg = '';

  constructor(
    private moduleService: ModuleService,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.tenantService.getAllTenants().subscribe({
      next: res => {
        this.tenantList = res;
        if (res.length > 0) {
          this.selectedTenantId = res[0].id!;
          this.loadModules();
        }
      }
    });
  }

  // =============================================
  // TENANT CHANGE
  // =============================================
  onTenantChange(): void {
    this.loadModules();
    this.resetPageSection();
    this.activeTab = 'modules';
  }

  // =============================================
  // MODULE CRUD
  // =============================================
  loadModules(): void {
    if (!this.selectedTenantId) return;
    this.moduleService.getModulesByTenant(this.selectedTenantId).subscribe({
      next: res => this.moduleList = res,
      error: () => this.showError('Modules load karne mein error')
    });
  }

  newModule(): void {
    this.module = this.emptyModule();
    this.moduleEditMode = false;
    this.moduleEditId = null;
    this.showModuleForm = true;
    this.errorMsg = '';
  }

  editModule(m: AppModule): void {
    this.module = { ...m };
    this.moduleEditMode = true;
    this.moduleEditId = m.id!;
    this.showModuleForm = true;
    this.errorMsg = '';
  }

  onModuleSubmit(form: any): void {
    if (form.invalid) return;
    this.errorMsg = '';
    this.module.tenantId = this.selectedTenantId;

    if (this.moduleEditMode && this.moduleEditId) {
      this.module.id = this.moduleEditId;
      this.moduleService.updateModule(this.module).subscribe({
        next: () => { this.loadModules(); this.cancelModuleForm(); this.flash('Module updated!'); },
        error: err => this.errorMsg = err.error?.message || 'Update error'
      });
    } else {
      this.moduleService.createModule(this.module).subscribe({
        next: () => { this.loadModules(); this.cancelModuleForm(); this.flash('Module created!'); },
        error: err => this.errorMsg = err.error?.message || 'Create error'
      });
    }
  }

  deleteModule(id: string): void {
    if (!confirm('Module delete karna chahte ho? Iske sab pages bhi delete ho jayenge!')) return;
    this.moduleService.deleteModule(id).subscribe({
      next: () => { this.loadModules(); this.flash('Module deleted!'); },
      error: err => this.showError(err.error?.message || 'Delete error')
    });
  }

  cancelModuleForm(): void {
    this.showModuleForm = false;
    this.moduleEditMode = false;
    this.moduleEditId = null;
    this.module = this.emptyModule();
    this.errorMsg = '';
  }

  // =============================================
  // MANAGE PAGES OF A MODULE
  // =============================================
  managePages(m: AppModule): void {
    this.selectedModuleForPages = m;
    this.activeTab = 'pages';
    this.loadPages(m.id!);
    this.cancelPageForm();
  }

  backToModules(): void {
    this.activeTab = 'modules';
    this.resetPageSection();
  }

  // =============================================
  // PAGE CRUD
  // =============================================
  loadPages(moduleId: string): void {
    this.moduleService.getPagesByModule(this.selectedTenantId, moduleId).subscribe({
      next: res => this.pageList = res,
      error: () => this.showError('Pages load karne mein error')
    });
  }

  newPage(): void {
    this.page = this.emptyPage();
    this.page.moduleId = this.selectedModuleForPages?.id || '';
    this.pageEditMode = false;
    this.pageEditId = null;
    this.showPageForm = true;
    this.errorMsg = '';
  }

  editPage(p: AppPage): void {
    this.page = { ...p };
    this.pageEditMode = true;
    this.pageEditId = p.pageId!;
    this.showPageForm = true;
    this.errorMsg = '';
  }

  onPageSubmit(form: any): void {
    if (form.invalid) return;
    this.errorMsg = '';
    this.page.tenantId = this.selectedTenantId;
    this.page.moduleId = this.selectedModuleForPages?.id || '';

    if (this.pageEditMode && this.pageEditId) {
      this.page.pageId = this.pageEditId;
      this.moduleService.updatePage(this.page).subscribe({
        next: () => {
          this.loadPages(this.selectedModuleForPages!.id!);
          this.cancelPageForm();
          this.flash('Page updated!');
        },
        error: err => this.errorMsg = err.error?.message || 'Update error'
      });
    } else {
      this.moduleService.createPage(this.page).subscribe({
        next: () => {
          this.loadPages(this.selectedModuleForPages!.id!);
          this.cancelPageForm();
          this.flash('Page created!');
        },
        error: err => this.errorMsg = err.error?.message || 'Create error'
      });
    }
  }

  deletePage(id: string): void {
    if (!confirm('Page delete karna chahte ho?')) return;
    this.moduleService.deletePage(id).subscribe({
      next: () => {
        this.loadPages(this.selectedModuleForPages!.id!);
        this.flash('Page deleted!');
      },
      error: err => this.showError(err.error?.message || 'Delete error')
    });
  }

  cancelPageForm(): void {
    this.showPageForm = false;
    this.pageEditMode = false;
    this.pageEditId = null;
    this.page = this.emptyPage();
    this.errorMsg = '';
  }

  // =============================================
  // HELPERS
  // =============================================
  flash(msg: string): void {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000);
  }

  showError(msg: string): void {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 4000);
  }

  resetPageSection(): void {
    this.selectedModuleForPages = null;
    this.pageList = [];
    this.cancelPageForm();
  }

  emptyModule(): AppModule {
    return {
      tenantId: this.selectedTenantId || '',
      name: '',
      icon: '',
      sortOrder: 1,
      isActive: true
    };
  }

  emptyPage(): AppPage {
    return {
      tenantId: this.selectedTenantId || '',
      moduleId: '',
      parentId: null,
      title: '',
      path: '',
      type: 'Page',
      icon: 'circle',
      isCollapsed: false,
      isHidden: false,
      description: '',
      link: '',
      serialNumber: 1
    };
  }
}