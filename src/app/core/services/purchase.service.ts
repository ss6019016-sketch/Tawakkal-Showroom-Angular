import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseBill } from 'src/app/models/purchase-bill.model';
// import { environment } from 'src/environments-old/environment.prod';
import { environment } from 'src/app/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private apiUrl = environment.apiUrl + 'purchase';
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  getNextBillNo(): Observable<string> {
    return this.http.get(`${this.apiUrl}/next-bill-no`, { ...this.getHeaders(), responseType: 'text' });
  }
  getAll(): Observable<PurchaseBill[]> {
    return this.http.get<PurchaseBill[]>(this.apiUrl, this.getHeaders());
  }
  create(bill: PurchaseBill): Observable<PurchaseBill> {
    return this.http.post<PurchaseBill>(this.apiUrl, bill, this.getHeaders());
  }
  update(bill: PurchaseBill): Observable<PurchaseBill> {
    return this.http.put<PurchaseBill>(this.apiUrl, bill, this.getHeaders());
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}