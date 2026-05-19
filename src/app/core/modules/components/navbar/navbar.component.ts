import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // ============================================
  // USER DATA
  // ============================================
  searchText: string = '';
  searchOptions: string[] = [];
  userFullName: string = 'Loading...';
  userEmail: string = '';
  userRole: string = '';
  userInitials: string = 'LO';
  userProfilePicture: string = '';
  isLoading: boolean = true;

  // ============================================
  // UI STATES
  // ============================================
onSearchChange(): void {
  if (!this.searchText) {
    this.searchOptions = [];
    return;
  }

  this.searchOptions = [
    this.searchText + ' Dashboard',
    this.searchText + ' Settings',
    this.searchText + ' Profile'
  ];
}
  notificationCount: number = 3;
  isFullscreen: boolean = false;
  currentLanguage: string = 'EN';

  // ============================================
  // CLEANUP
  // ============================================

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // ============================================
  // INIT
  // ============================================

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================================
  // LOAD USER DATA
  // ============================================

  loadUserData(): void {

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

  // ============================================
  // ROLE BADGE
  // ============================================

  getRoleBadgeClass(): string {

    switch (this.userRole?.toLowerCase()) {

      case 'admin':
        return 'bg-danger';

      case 'manager':
        return 'bg-warning';

      case 'cashier':
        return 'bg-success';

      case 'viewer':
        return 'bg-secondary';

      default:
        return 'bg-dark';
    }
  }

  // ============================================
  // SIDEBAR
  // ============================================

  toggleSidebar(): void {

    const sidebar = document.querySelector('.sidebar');

    sidebar?.classList.toggle('mobile-open');
  }

  // ============================================
  // FULLSCREEN
  // ============================================

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

  // ============================================
  // LANGUAGE
  // ============================================

  changeLanguage(lang: string): void {

    this.currentLanguage = lang;

    localStorage.setItem('language', lang);

    console.log('Language changed to:', lang);
  }

  // ============================================
  // NAVIGATION
  // ============================================

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  openNotifications(): void {
    console.log('Opening notifications...');
  }

  // ============================================
  // LOGOUT
  // ============================================

  logout(): void {

    if (confirm('Are you sure you want to logout?')) {

      this.authService.logout();
    }
  }

  // ============================================
  // HELPERS
  // ============================================

  getInitials(name?: string): string {

    if (!name) return 'U';

    const names = name.trim().split(' ');

    if (names.length >= 2) {

      return (
        names[0][0] + names[1][0]
      ).toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  }

  getProfilePictureUrl(): string {

    if (this.userProfilePicture) {
      return this.userProfilePicture;
    }

    return 'assets/default-avatar.png';
  }

  getNotificationDisplay(): string {

    return this.notificationCount > 99
      ? '99+'
      : this.notificationCount.toString();
  }

  get hasNotifications(): boolean {

    return this.notificationCount > 0;
  }
}