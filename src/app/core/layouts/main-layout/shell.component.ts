import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModulePageService, ModuleMenuDto } from 'src/app/core/services/module-page.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit, OnDestroy {

  searchText = '';
  searchOptions: Array<{ label: string; route: string }> = [];
  searchEntries: Array<{ label: string; route: string }> = [];
  userFullName = 'Loading...';
  userEmail = '';
  userRole = '';
  userInitials = 'LO';
  userProfilePicture = '';
  isLoading = true;
  notificationCount = 3;
  isFullscreen = false;
  currentLanguage = 'EN';

  menuItems: MenuItem[] = [];
  isCollapsed = false;

  private userSub: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private modulePageService: ModulePageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();

    this.userSub = this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userFullName = user.name || 'User';
        this.userEmail = user.email || '';
        this.userRole = user.role || 'User';
        this.userInitials = this.getInitials(user.name);
        this.loadMenu();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(): void {
    const value = this.searchText?.trim().toLowerCase();

    if (!value) {
      this.searchOptions = [];
      return;
    }

    this.searchOptions = this.searchEntries
      .filter(entry => entry.label.toLowerCase().includes(value))
      .slice(0, 10);
  }

  selectSearchOption(option: { label: string; route: string }): void {
    this.searchText = option.label;
    this.searchOptions = [];
    if (option.route) {
      this.router.navigate([option.route]);
    }
  }

  private loadUserData(): void {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => {
        if (user) {
          this.userFullName = user.name || 'User';
          this.userEmail = user.email || '';
          this.userRole = user.role || 'User';
          this.userInitials = this.getInitials(user.name);
          this.isLoading = false;
        }
      });
  }

  toggleSidebar(): void {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('mobile-open');
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullscreen = false;
      }
    }
  }

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  openNotifications(): void {
    console.log('Opening notifications...');
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
    }
  }

  getInitials(name?: string): string {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  getProfilePictureUrl(): string {
    return this.userProfilePicture || 'assets/default-avatar.png';
  }

  getNotificationDisplay(): string {
    return this.notificationCount > 99 ? '99+' : this.notificationCount.toString();
  }

  get hasNotifications(): boolean {
    return this.notificationCount > 0;
  }

  loadMenu(): void {
    this.isLoading = true;
    this.modulePageService.getModulesAndPages().subscribe({
      next: (modules: ModuleMenuDto[]) => {
        this.menuItems = modules.map(mod => ({
          label: mod.moduleName,
          icon: mod.moduleIcon,
          expanded: this.isModuleActive(mod),
          children: mod.pages
            .filter(p => !p.isHidden)
            .map(p => ({
              label: p.title,
              icon: p.icon,
              route: p.path
            }))
        }));

        this.searchEntries = modules.flatMap(mod =>
          mod.pages
            .filter(p => !p.isHidden)
            .map(p => ({
              label: `${mod.moduleName} › ${p.title}`,
              route: p.path
            }))
        );

        this.isLoading = false;
      },
      error: err => {
        console.error('Menu load failed:', err);
        this.isLoading = false;
      }
    });
  }

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
    return item.children?.some(child => child.route ? this.router.url.startsWith(child.route) : false) ?? false;
  }
}
