import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Tenant } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  step: 'credentials' | 'tenant' = 'credentials';
 
  email    = '';
  password = '';
  tenants: any[] = [];
  selectedTenantId: number | null = null;
 
  isLoading = false;
  error     = '';
 
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/dashboard']);
  }
 
  // Step 1
  onGetTenants(): void {
    if (!this.email || !this.password) { this.error = 'Email aur password required hain'; return; }
    this.isLoading = true;
    this.error = '';
 
    this.auth.getTenants(this.email, this.password).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const tenants: any[] = res?.data || [];
 
        if (tenants.length === 0) { this.error = 'Koi tenant assign nahi — Admin se contact karein'; return; }
 
        // Sirf ek tenant hai — seedha login
        if (tenants.length === 1) { this.doLogin(tenants[0].tenantId); return; }
 
        // Multiple — select karo
        this.tenants = tenants;
        this.step = 'tenant';
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err?.error?.message || 'Invalid email ya password';
      }
    });
  }
 
  // Step 2
  onLogin(): void {
    if (!this.selectedTenantId) { this.error = 'Branch select karein'; return; }
    this.doLogin(this.selectedTenantId);
  }
 
  private doLogin(tenantId: number): void {
    this.isLoading = true;
    this.error = '';
 
    this.auth.login(this.email, this.password, tenantId).subscribe({
      next: () => { this.isLoading = false; this.router.navigate(['/dashboard']); },
      error: (err) => { this.isLoading = false; this.error = err?.error?.message || 'Login fail ho gayi'; }
    });
  }

}