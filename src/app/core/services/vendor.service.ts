import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/models/vendor.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private apiUrl = environment.apiUrl + 'vendor';

  constructor(private http: HttpClient) {}

  // 🔐 agar JWT use kar raha hai
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl, this.getHeaders());
  }

  create(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor, this.getHeaders());
  }

  update(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(this.apiUrl, vendor, this.getHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}