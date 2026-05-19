import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments-old/environment-old';

@Injectable({ providedIn: 'root' })
export class ProductService {
private apiUrl = `${environment.apiUrl}product`;
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, this.getHeaders());
  }
  create(p: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, p, this.getHeaders());
  }
  update(p: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, p, this.getHeaders());
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}