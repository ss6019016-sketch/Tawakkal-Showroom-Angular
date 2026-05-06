import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardData } from 'src/app/models/dashboard.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.apiUrl + 'dashboard';
  constructor(private https: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  getData(): Observable<DashboardData> {
    return this.https.get<DashboardData>(this.apiUrl, this.getHeaders());
  }
}