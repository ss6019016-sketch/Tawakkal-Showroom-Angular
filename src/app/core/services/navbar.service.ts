// ============================================
// NAVBAR SERVICE - Updated with Complete ProfileService
// services/navbar.service.ts
// ============================================

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { ProfileService, UserProfile } from './profile.service';

export interface NavbarUserData {
  fullName: string;
  email: string;
  role: string;
  initials: string;
  profilePicture: string;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  
  // User data observable
  private userDataSubject = new BehaviorSubject<NavbarUserData>({
    fullName: 'Loading...',
    email: '',
    role: '',
    initials: 'LO',
    profilePicture: '',
    isLoading: true
  });
  public userData$ = this.userDataSubject.asObservable();

  // Notification data
  private notificationCountSubject = new BehaviorSubject<number>(0);
  public notificationCount$ = this.notificationCountSubject.asObservable();

  // Fullscreen state
  private isFullscreenSubject = new BehaviorSubject<boolean>(false);
  public isFullscreen$ = this.isFullscreenSubject.asObservable();

  // Language state
  private currentLanguageSubject = new BehaviorSubject<string>('EN');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    // Subscribe to profile changes from ProfileService
    this.profileService.userProfile$.subscribe(profile => {
      if (profile) {
        this.setUserDataFromProfile(profile);
      }
    });
  }

  // ============================================
  // LOAD USER DATA
  // ============================================
  loadUserData(): void {
    // First check if ProfileService already has data
    const currentProfile = this.profileService.getCurrentProfile();
    if (currentProfile) {
      this.setUserDataFromProfile(currentProfile);
    }

    // Then load fresh from backend
    this.profileService.getUserProfile().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // ProfileService will emit via userProfile$ and we'll catch it above
          console.log('User profile loaded successfully');
        } else {
          this.loadFromAuthService();
        }
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.loadFromAuthService();
      }
    });
  }

  // Set user data from profile
  private setUserDataFromProfile(profile: UserProfile): void {
    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';
    
    this.userDataSubject.next({
      fullName: `${firstName} ${lastName}`.trim() || 'User',
      email: profile.email,
      role: profile.role || 'User',
      initials: this.generateInitials(firstName, lastName),
      profilePicture: profile.profilePicture || '',
      isLoading: false
    });
  }

  // Fallback to auth service
  private loadFromAuthService(): void {
    const authUser = this.authService.currentUserValue;
    if (authUser) {
      const name = authUser.name || 'User';
      this.userDataSubject.next({
        fullName: name,
        email: authUser.email,
        role: authUser.role || 'User',
        initials: this.generateInitials(name, ''),
        profilePicture: '',
        isLoading: false
      });
    } else {
      // No user at all
      this.userDataSubject.next({
        fullName: 'Guest',
        email: '',
        role: '',
        initials: 'GU',
        profilePicture: '',
        isLoading: false
      });
    }
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================
  loadNotifications(): void {
    // TODO: Replace with actual API call
    // Example: this.http.get('/api/notifications/count')
    this.notificationCountSubject.next(3);
  }

  updateNotificationCount(count: number): void {
    this.notificationCountSubject.next(count);
  }

  clearNotifications(): void {
    this.notificationCountSubject.next(0);
  }

  getNotificationCount(): number {
    return this.notificationCountSubject.value;
  }

  // ============================================
  // FULLSCREEN
  // ============================================
  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => {
          this.isFullscreenSubject.next(true);
        })
        .catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => {
            this.isFullscreenSubject.next(false);
          })
          .catch(err => {
            console.error('Error attempting to exit fullscreen:', err);
          });
      }
    }
  }

  // ============================================
  // LANGUAGE
  // ============================================
  changeLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
    localStorage.setItem('selectedLanguage', lang);
    // TODO: Implement actual i18n language change
    console.log(`Language changed to: ${lang}`);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  loadSavedLanguage(): void {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) {
      this.currentLanguageSubject.next(saved);
    }
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  generateInitials(firstName: string, lastName: string): string {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return (first + last) || 'U';
  }

  getRoleColor(role: string): string {
    switch (role?.toLowerCase()) {
      case 'superadmin': return '#dc3545';
      case 'admin': return '#fd7e14';
      case 'manager': return '#0dcaf0';
      case 'customer': return '#20c997';
      default: return '#6c757d';
    }
  }

  getRoleBadgeClass(role: string): string {
    switch (role?.toLowerCase()) {
      case 'superadmin': return 'bg-danger';
      case 'admin': return 'bg-warning';
      case 'manager': return 'bg-info';
      case 'customer': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  getProfilePictureUrl(picture: string): string {
    if (!picture) return '';
    if (picture.startsWith('http')) {
      return picture;
    }
    return `https://localhost:7091${picture}`;
  }

  getNotificationDisplay(count: number): string {
    return count > 99 ? '99+' : count.toString();
  }

  // ============================================
  // REFRESH
  // ============================================
  refreshUserData(): void {
    this.loadUserData();
  }

  // ============================================
  // CLEANUP
  // ============================================
  clearData(): void {
    this.userDataSubject.next({
      fullName: 'Guest',
      email: '',
      role: '',
      initials: 'GU',
      profilePicture: '',
      isLoading: false
    });
    this.notificationCountSubject.next(0);
    this.isFullscreenSubject.next(false);
  }

  // Get current user data (non-observable)
  getCurrentUserData(): NavbarUserData {
    return this.userDataSubject.value;
  }
}