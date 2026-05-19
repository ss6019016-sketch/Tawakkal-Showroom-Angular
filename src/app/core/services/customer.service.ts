import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments-old/environment-old';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = `${environment.apiUrl}Customer`;

  constructor(private http: HttpClient) {}

  private getHeaders() {

    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<Customer[]> {

    return this.http.get<Customer[]>(
      this.apiUrl,
      this.getHeaders()
    );
  }

  create(customer: Customer): Observable<Customer> {

    return this.http.post<Customer>(
      this.apiUrl,
      customer,
      this.getHeaders()
    );
  }

  update(customer: Customer): Observable<Customer> {

    return this.http.put<Customer>(
      this.apiUrl,
      customer,
      this.getHeaders()
    );
  }

  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }
}