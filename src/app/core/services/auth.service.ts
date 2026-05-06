import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/Environment.prod';

// ============================
// INTERFACES
// ============================

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

// ============================
// SERVICE
// ============================

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}Auth`;

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {

    const storedUser = localStorage.getItem('currentUser');

    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  // ============================
  // GET CURRENT USER
  // ============================
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserValue;
  }

  // ============================
  // LOGIN
  // ============================
  login(email: string, password: string): Observable<User> {

    const loginData: LoginRequest = { email, password };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map(response => {

          if (response.success && response.token) {

            const user: User = {
              ...response.user,
              token: response.token
            };

            // Save data
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', response.token);

            // Update observable
            this.currentUserSubject.next(user);

            return user;
          }

          throw new Error(response.message || 'Login failed');
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  // ============================
  // REGISTER
  // ============================
  register(data: RegisterRequest): Observable<RegisterResponse> {

    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Register error:', error);
          throw error;
        })
      );
  }

  // ============================
  // LOGOUT
  // ============================
  logout(): void {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    this.currentUserSubject.next(null);
  }

  // ============================
  // AUTH CHECK
  // ============================
  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  // ============================
  // TOKEN
  // ============================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ============================
  // HEADERS
  // ============================
  getAuthHeaders(): HttpHeaders {

    const token = this.getToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ============================
  // RESET PASSWORD
  // ============================
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email });
  }

  // ============================
  // VERIFY TOKEN
  // ============================
  verifyToken(): Observable<boolean> {

    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    return this.http.get<any>(`${this.apiUrl}/verify-token`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(res => res.success as boolean),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }
}