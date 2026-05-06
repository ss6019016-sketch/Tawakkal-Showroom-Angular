import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/Environment.prod';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private apiUrl = environment.apiUrl + 'customer';

  constructor(private https: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  getAll(): Observable<Customer[]> {
    return this.https.get<Customer[]>(this.apiUrl, this.getHeaders());
  }

  create(customer: Customer): Observable<Customer> {
    return this.https.post<Customer>(this.apiUrl, customer, this.getHeaders());
  }

  update(customer: Customer): Observable<Customer> {
    return this.https.put<Customer>(this.apiUrl, customer, this.getHeaders());
  }

  delete(id: string): Observable<any> {
    return this.https.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}