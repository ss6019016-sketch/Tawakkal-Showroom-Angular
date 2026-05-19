import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, Tenant } from 'src/app/models/user.model';
import { environment } from 'src/environments-old/environment-old';

@Injectable({ providedIn: 'root' })
export class TenantService {
private base = environment.apiUrl.slice(0, -1);  

  constructor(private http: HttpClient) {}

  private h() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  // ─── TENANTS ───
  getAllTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(`${this.base}/tenant`, this.h());
  }
  createTenant(t: Tenant): Observable<Tenant> {
    return this.http.post<Tenant>(`${this.base}/tenant`, t, this.h());
  }
  updateTenant(t: Tenant): Observable<Tenant> {
    return this.http.put<Tenant>(`${this.base}/tenant`, t, this.h());
  }
  deleteTenant(id: string): Observable<any> {
    return this.http.delete(`${this.base}/tenant/${id}`, this.h());
  }

  // ─── ROLES ───
  getRolesByTenant(tenantId: string): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.base}/role/by-tenant/${tenantId}`, this.h());
  }
  getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.base}/role/${id}`, this.h());
  }
  getModules(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/role/modules`, this.h());
  }
  createRole(r: Role): Observable<Role> {
    return this.http.post<Role>(`${this.base}/role`, r, this.h());
  }
  updateRole(r: Role): Observable<Role> {
    return this.http.put<Role>(`${this.base}/role`, r, this.h());
  }
  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.base}/role/${id}`, this.h());
  }

  // ─── USERS ───
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/user`, this.h());
  }
  createUser(u: any): Observable<any> {
    return this.http.post<any>(`${this.base}/user`, u, this.h());
  }
  updateUser(u: any): Observable<any> {
    return this.http.put<any>(`${this.base}/user`, u, this.h());
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.base}/user/${id}`, this.h());
  }
  toggleUser(id: string): Observable<any> {
    return this.http.patch(`${this.base}/user/toggle/${id}`, {}, this.h());
  }
  assignTenant(data: { userId: string; tenantId: string; roleId: string }): Observable<any> {
    return this.http.post(`${this.base}/user/assign-tenant`, data, this.h());
  }
  removeFromTenant(userId: string, tenantId: string): Observable<any> {
    return this.http.delete(`${this.base}/user/${userId}/tenant/${tenantId}`, this.h());
  }
}