import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments-old/environment-old';
import { AppModule, AppPage } from 'src/app/models/Module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =============================================
  // MODULE APIS
  // =============================================

  getModulesByTenant(tenantId: string): Observable<AppModule[]> {
    return this.http.get<AppModule[]>(`${this.baseUrl}/module/by-tenant/${tenantId}`);
  }

  getModuleById(id: string): Observable<AppModule> {
    return this.http.get<AppModule>(`${this.baseUrl}/module/${id}`);
  }

  createModule(dto: AppModule): Observable<AppModule> {
    return this.http.post<AppModule>(`${this.baseUrl}/module`, dto);
  }

  updateModule(dto: AppModule): Observable<AppModule> {
    return this.http.put<AppModule>(`${this.baseUrl}/module`, dto);
  }

  deleteModule(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/module/${id}`);
  }

  // =============================================
  // PAGE APIS
  // =============================================

  getPagesByTenant(tenantId: string): Observable<AppPage[]> {
    return this.http.get<AppPage[]>(`${this.baseUrl}/page/by-tenant/${tenantId}`);
  }

  getPagesByModule(tenantId: string, moduleId: string): Observable<AppPage[]> {
    return this.http.get<AppPage[]>(`${this.baseUrl}/page/by-module/${tenantId}/${moduleId}`);
  }

  getPageById(id: string): Observable<AppPage> {
    return this.http.get<AppPage>(`${this.baseUrl}/page/${id}`);
  }

  createPage(dto: AppPage): Observable<AppPage> {
    return this.http.post<AppPage>(`${this.baseUrl}/page`, dto);
  }

  updatePage(dto: AppPage): Observable<AppPage> {
    return this.http.put<AppPage>(`${this.baseUrl}/page`, dto);
  }

  deletePage(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/page/${id}`);
  }
}