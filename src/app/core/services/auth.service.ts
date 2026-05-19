import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PermissionService } from './permission.service';
import { environment } from 'src/environments-old/environment-old';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}Auth`;

 
  currentUser = new BehaviorSubject<any>(this.loadUser());
 
  constructor(private http: HttpClient, private router: Router) {}
 
  // Step 1 — email + password bhejo, tenants list milegi
  getTenants(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/get-tenants`, { email, password });
  }
 
  // Step 2 — tenantId ke saath final login
  login(email: string, password: string, tenantId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password, tenantId }).pipe(
      tap((res: any) => {
        const d = res?.data; // backend ApiResponse<LoginResponseDto> wrap karta hai
        if (!d) return;
 
        // Token
        localStorage.setItem('auth_token', d.token);
 
        // TenantId (alag key — asaan access ke liye)
        localStorage.setItem('auth_tenantId', d.tenantId.toString());
 
        // Poora user object
        const user = {
          userId:      d.userId,
          name:        d.name,
          email:       d.email,
          role:        d.roleName,
          tenantId:    d.tenantId,
          tenantName:  d.tenantName,
          isSuperAdmin: d.isSuperAdmin,
          expiresAt:   d.expiresAt,
          permissions: d.permissions || []
        };
        localStorage.setItem('auth_user', JSON.stringify(user));
 
        this.currentUser.next(user);
      })
    );
  }
 
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_tenantId');
    localStorage.removeItem('auth_user');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }
 
  // Helpers
  getToken(): string    { return localStorage.getItem('auth_token') || ''; }
  getTenantId(): number { return parseInt(localStorage.getItem('auth_tenantId') || '0'); }
  getUser(): any        { return this.currentUser.value; }
  isLoggedIn(): boolean { return !!localStorage.getItem('auth_token'); }
 
  private loadUser(): any {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

}