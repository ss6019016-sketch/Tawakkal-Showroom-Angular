import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Warehouse,
  StockInHand,
  StockLedger,
  StockAdjustment,
  DealerRate
} from 'src/app/models/inventory.model';
import { environment } from 'src/environments-old/environment-old';

@Injectable({ providedIn: 'root' })
export class InventoryService {

private apiUrl = `${environment.apiUrl}inventory`;
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ================= WAREHOUSE =================

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(
      `${this.apiUrl}/warehouses`,
      this.getHeaders()
    );
  }

  createWarehouse(w: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(
      `${this.apiUrl}/warehouses`,
      w,
      this.getHeaders()
    );
  }

  updateWarehouse(w: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(
      `${this.apiUrl}/warehouses`,
      w,
      this.getHeaders()
    );
  }

  deleteWarehouse(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/warehouses/${id}`,
      this.getHeaders()
    );
  }

  // ================= STOCK =================

  getStockInHand(warehouseId?: string): Observable<StockInHand[]> {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : '';

    return this.http.get<StockInHand[]>(
      `${this.apiUrl}/stock-in-hand${q}`,
      this.getHeaders()
    );
  }

  getStockLedger(productId?: string, warehouseId?: string): Observable<StockLedger[]> {
    const params: string[] = [];

    if (productId) params.push(`productId=${productId}`);
    if (warehouseId) params.push(`warehouseId=${warehouseId}`);

    const q = params.length ? `?${params.join('&')}` : '';

    return this.http.get<StockLedger[]>(
      `${this.apiUrl}/stock-ledger${q}`,
      this.getHeaders()
    );
  }

  // ================= ADJUSTMENTS =================

  getNextAdjNo(): Observable<string> {
    return this.http.get(`${this.apiUrl}/adjustments/next-no`, {
      ...this.getHeaders(),
      responseType: 'text'
    });
  }

  getAdjustments(): Observable<StockAdjustment[]> {
    return this.http.get<StockAdjustment[]>(
      `${this.apiUrl}/adjustments`,
      this.getHeaders()
    );
  }

  createAdjustment(a: StockAdjustment): Observable<StockAdjustment> {
    return this.http.post<StockAdjustment>(
      `${this.apiUrl}/adjustments`,
      a,
      this.getHeaders()
    );
  }

  deleteAdjustment(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/adjustments/${id}`,
      this.getHeaders()
    );
  }

  // ================= DEALER RATE =================

  getDealerRates(): Observable<DealerRate[]> {
    return this.http.get<DealerRate[]>(
      `${this.apiUrl}/dealer-rates`,
      this.getHeaders()
    );
  }

  createDealerRate(dr: DealerRate): Observable<DealerRate> {
    return this.http.post<DealerRate>(
      `${this.apiUrl}/dealer-rates`,
      dr,
      this.getHeaders()
    );
  }

  updateDealerRate(dr: DealerRate): Observable<DealerRate> {
    return this.http.put<DealerRate>(
      `${this.apiUrl}/dealer-rates`,
      dr,
      this.getHeaders()
    );
  }

  deleteDealerRate(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/dealer-rates/${id}`,
      this.getHeaders()
    );
  }
}