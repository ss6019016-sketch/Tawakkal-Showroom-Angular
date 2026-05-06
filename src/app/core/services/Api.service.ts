import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResponse } from '..';
import { environment } from 'src/environments/Environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + 'inventory';

  constructor(private http: HttpClient) { }

  // GET request
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key].toString());
        }
      });
    }

    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  // GET request with full response (for pagination headers)
  getWithPagination<T>(endpoint: string, params?: any): Observable<PaginatedResponse<T>> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key].toString());
        }
      });
    }

    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, {
      params: httpParams,
      observe: 'response'
    }).pipe(
      map(response => {
        const totalCount = parseInt(response.headers.get('X-Total-Count') || '0');
        const page = parseInt(response.headers.get('X-Page') || '1');
        const pageSize = parseInt(response.headers.get('X-Page-Size') || '50');
        
        return {
          data: response.body || [],
          totalCount,
          page,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize)
        };
      }),
      catchError(this.handleError)
    );
  }

  // POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  // PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  // DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  // Upload file
  uploadFile(endpoint: string, file: File, additionalData?: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post(`${this.apiUrl}/${endpoint}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Download file
  downloadFile(endpoint: string, filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, {
      responseType: 'blob'
    }).pipe(
      map((response: Blob) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
        return blob;
      }),
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.errors) {
        errorMessage = error.error.errors.join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
      }
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}