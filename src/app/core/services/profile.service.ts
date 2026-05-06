// ============================================
// PROFILE SERVICE - Complete with Caching & Observables
// services/profile.service.ts
// ============================================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { environment } from 'src/environments-old/environment.prod';

import { environment } from 'src/app/environments/environment.prod';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  address?: string;
  profilePicture?: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
  address?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl + 'profile';

  // BehaviorSubject for reactive profile updates
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load cached profile on service initialization
    const cached = this.getCachedProfile();
    if (cached) {
      this.userProfileSubject.next(cached);
    }
  }

  // ============================================
  // GET AUTH HEADERS
  // ============================================
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || ''}`
    });
  }

  // ============================================
  // GET USER PROFILE
  // ============================================
  getUserProfile(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          // Update BehaviorSubject
          this.userProfileSubject.next(response.data);
          // Cache in localStorage
          this.cacheProfile(response.data);
        }
      }),
      catchError(this.handleError)
    );
  }

  // ============================================
  // UPDATE PROFILE
  // ============================================
  updateProfile(profileData: UpdateProfileRequest): Observable<ApiResponse<UserProfile>> {
    return this.http.put<ApiResponse<UserProfile>>(this.apiUrl, profileData, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          // Update BehaviorSubject
          this.userProfileSubject.next(response.data);
          // Update cache
          this.cacheProfile(response.data);
        }
      }),
      catchError(this.handleError)
    );
  }

  // ============================================
  // CHANGE PASSWORD
  // ============================================
  changePassword(passwordData: ChangePasswordRequest): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/password`, passwordData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // ============================================
  // UPLOAD PROFILE PICTURE
  // ============================================
  uploadProfilePicture(file: File): Observable<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    // Don't set Content-Type for FormData - browser will set it with boundary
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });

    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/upload-picture`, formData, {
      headers: headers
    }).pipe(
      tap(response => {
        if (response.success && response.data?.profilePicture) {
          // Update current profile with new picture
          const currentProfile = this.userProfileSubject.value;
          if (currentProfile) {
            currentProfile.profilePicture = response.data.profilePicture;
            this.userProfileSubject.next(currentProfile);
            this.cacheProfile(currentProfile);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  // ============================================
  // DELETE PROFILE PICTURE
  // ============================================
  deleteProfilePicture(): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete-picture`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        if (response.success) {
          // Update current profile
          const currentProfile = this.userProfileSubject.value;
          if (currentProfile) {
            currentProfile.profilePicture = undefined;
            this.userProfileSubject.next(currentProfile);
            this.cacheProfile(currentProfile);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  // ============================================
  // CACHE MANAGEMENT
  // ============================================
  
  // Get cached profile
  getCachedProfile(): UserProfile | null {
    const cached = localStorage.getItem('userProfile');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        console.error('Error parsing cached profile:', error);
        return null;
      }
    }
    return null;
  }

  // Cache profile in localStorage
  private cacheProfile(profile: UserProfile): void {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error caching profile:', error);
    }
  }

  // Clear profile cache
  clearProfile(): void {
    this.userProfileSubject.next(null);
    localStorage.removeItem('userProfile');
  }

  // ============================================
  // GET CURRENT PROFILE (NON-OBSERVABLE)
  // ============================================
  getCurrentProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  // ============================================
  // ERROR HANDLER
  // ============================================
  private handleError(error: any): Observable<never> {
    console.error('ProfileService API Error:', error);
    
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || `Error Code: ${error.status}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  // Check if profile is loaded
  isProfileLoaded(): boolean {
    return this.userProfileSubject.value !== null;
  }

  // Refresh profile from backend
  refreshProfile(): void {
    this.getUserProfile().subscribe({
      next: (response) => {
        console.log('Profile refreshed successfully');
      },
      error: (error) => {
        console.error('Error refreshing profile:', error);
      }
    });
  }

  // Get profile picture URL
  getProfilePictureUrl(): string {
    const profile = this.userProfileSubject.value;
    if (!profile?.profilePicture) return '';
    
    if (profile.profilePicture.startsWith('http')) {
      return profile.profilePicture;
    }
    
    return `https://localhost:7091${profile.profilePicture}`;
  }

  // Get user initials
  getUserInitials(): string {
    const profile = this.userProfileSubject.value;
    if (!profile) return 'U';
    
    const first = profile.firstName?.charAt(0)?.toUpperCase() || '';
    const last = profile.lastName?.charAt(0)?.toUpperCase() || '';
    return (first + last) || 'U';
  }

  // Get full name
  getFullName(): string {
    const profile = this.userProfileSubject.value;
    if (!profile) return 'User';
    
    return `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'User';
  }
}