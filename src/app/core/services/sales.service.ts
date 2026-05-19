import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesInvoice } from 'src/app/models/sales-invoice.model';
import { environment } from 'src/environments-old/environment-old';
// import { environment } from 'src/environments-old/environment.prod';

@Injectable({ providedIn: 'root' })
export class SalesService {
private apiUrl = `${environment.apiUrl}sales`;
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  getNextInvoiceNo(): Observable<string> {
    return this.http.get(`${this.apiUrl}/next-invoice-no`, { ...this.getHeaders(), responseType: 'text' });
  }
  getAll(): Observable<SalesInvoice[]> {
    return this.http.get<SalesInvoice[]>(this.apiUrl, this.getHeaders());
  }
  create(inv: SalesInvoice): Observable<SalesInvoice> {
    return this.http.post<SalesInvoice>(this.apiUrl, inv, this.getHeaders());
  }
  update(inv: SalesInvoice): Observable<SalesInvoice> {
    return this.http.put<SalesInvoice>(this.apiUrl, inv, this.getHeaders());
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}