import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Voucher, VoucherEntry } from 'src/app/models/Account.model';
// import { environment } from 'src/environments-old/environment';
import { environment } from 'src/app/environments/environment.prod';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = environment.apiUrl + 'account';
  private apiUrl2 = environment.apiUrl + 'voucher'; 

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  // ─── ACCOUNTS ───
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}`, this.headers());
  }
  createAccount(a: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}`, a, this.headers());
  }
  updateAccount(a: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}`, a, this.headers());
  }
  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.headers());
  }
  seedAccounts(): Observable<any> {
    return this.http.post(`${this.apiUrl}/seed`, {}, this.headers());
  }

  // ─── VOUCHERS ───
  getNextVoucherNo(type: number): Observable<string> {
    return this.http.get(`${this.apiUrl2}/next-voucher-no/${type}`,
      { ...this.headers(), responseType: 'text' });
  }
  getAllVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.apiUrl2}`, this.headers());
  }
  getVouchersByType(type: number): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.apiUrl2}/by-type/${type}`, this.headers());
  }
  createVoucher(v: Voucher): Observable<Voucher> {
    return this.http.post<Voucher>(`${this.apiUrl2}`, v, this.headers());
  }
  updateVoucher(v: Voucher): Observable<Voucher> {
    return this.http.put<Voucher>(`${this.apiUrl2}`, v, this.headers());
  }
  deleteVoucher(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/${id}`, this.headers());
  }

  // ─── REPORTS ───
  getLedger(accountId: string, from?: string, to?: string): Observable<VoucherEntry[]> {
    let url = `${this.apiUrl}/voucher/ledger/${accountId}`;
    const params: string[] = [];
    if (from) params.push(`from=${from}`);
    if (to)   params.push(`to=${to}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<VoucherEntry[]>(url, this.headers());
  }
  getCashBook(from?: string, to?: string): Observable<VoucherEntry[]> {
    let url = `${this.apiUrl2}/cash-book`;
    const params: string[] = [];
    if (from) params.push(`from=${from}`);
    if (to)   params.push(`to=${to}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<VoucherEntry[]>(url, this.headers());
  }
getTrialBalance(): Observable<Account[]> {
  return this.http.get<Account[]>(`${this.apiUrl2}/trial-balance`, this.headers());
}
}