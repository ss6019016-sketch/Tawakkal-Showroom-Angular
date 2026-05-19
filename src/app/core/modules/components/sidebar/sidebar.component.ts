import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModulePageService, ModuleMenuDto } from 'src/app/core/services/module-page.service';

interface MenuItem {
  label:     string;
  icon:      string;
  route?:    string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector:    'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:   ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName   = '';
  userRole   = '';
  tenantName = '';
  menuItems: MenuItem[] = [];
  isLoading  = true;
  isCollapsed = false;

  private userSub: Subscription = new Subscription();

  constructor(
    private auth:              AuthService,
    private router:            Router,
    private modulePageService: ModulePageService
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.currentUser.subscribe(user => {
      if (user) {
        this.userName   = user.name       || '';
        this.userRole   = user.role       || '';
        this.tenantName = user.tenantName || '';
        this.loadMenu();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  // ============================================
  // MENU LOAD
  // ============================================

  loadMenu(): void {
    this.isLoading = true;
    this.modulePageService.getModulesAndPages().subscribe({
      next: (modules: ModuleMenuDto[]) => {
        this.menuItems = modules.map(mod => ({
          label:    mod.moduleName,
          icon:     mod.moduleIcon,
          expanded: this.isModuleActive(mod),
          children: mod.pages
            .filter(p => !p.isHidden)
            .map(p => ({
              label: p.title,
              icon:  p.icon,
              route: p.path
            }))
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Menu load failed:', err);
        this.isLoading = false;
      }
    });
  }

  // ============================================
  // HELPERS
  // ============================================

  isModuleActive(mod: ModuleMenuDto): boolean {
    return mod.pages.some(p => p.path && this.router.url.startsWith(p.path));
  }

  toggle(item: MenuItem): void {
    item.expanded = !item.expanded;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  isParentActive(item: MenuItem): boolean {
    return item.children?.some(child =>
      child.route ? this.router.url.startsWith(child.route) : false
    ) ?? false;
  }

  // ============================================
  // LOGOUT
  // ============================================

  logout(): void {
    this.auth.logout();
  }
}