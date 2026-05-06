import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/user.model';
import { environment } from 'src/environments/Environment.prod';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem(environment.tokenKey);

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.apiUrl, this.getHeaders());
  }

  create(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.apiUrl, user, this.getHeaders());
  }

  update(user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(this.apiUrl, user, this.getHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  toggleStatus(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/toggle/${id}`, {}, this.getHeaders());
  }
}