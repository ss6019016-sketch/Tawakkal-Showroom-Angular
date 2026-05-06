import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse, StockInHand, StockLedger, StockAdjustment, DealerRate } from 'src/app/models/inventory.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = environment.apiUrl + 'inventory';

  constructor(private http: HttpClient) {}

  private h() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  // Warehouses
  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.apiUrl}/warehouses`, this.h());
  }
  createWarehouse(w: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.apiUrl}/warehouses`, w, this.h());
  }
  updateWarehouse(w: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.apiUrl}/warehouses`, w, this.h());
  }
  deleteWarehouse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/warehouses/${id}`, this.h());
  }

  // Stock
  getStockInHand(warehouseId?: string): Observable<StockInHand[]> {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : '';
    return this.http.get<StockInHand[]>(`${this.apiUrl}/stock-in-hand${q}`, this.h());
  }
  getStockLedger(productId?: string, warehouseId?: string): Observable<StockLedger[]> {
    const params: string[] = [];
    if (productId)   params.push(`productId=${productId}`);
    if (warehouseId) params.push(`warehouseId=${warehouseId}`);
    const q = params.length ? '?' + params.join('&') : '';
    return this.http.get<StockLedger[]>(`${this.apiUrl}/stock-ledger${q}`, this.h());
  }

  // Adjustments
  getNextAdjNo(): Observable<string> {
    return this.http.get(`${this.apiUrl}/adjustment/next-no`, { ...this.h(), responseType: 'text' });
  }
  getAdjustments(): Observable<StockAdjustment[]> {
    return this.http.get<StockAdjustment[]>(`${this.apiUrl}/adjustments`, this.h());
  }
  createAdjustment(a: StockAdjustment): Observable<StockAdjustment> {
    return this.http.post<StockAdjustment>(`${this.apiUrl}/adjustments`, a, this.h());
  }
  deleteAdjustment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/adjustments/${id}`, this.h());
  }

  // Dealer Rates
  getDealerRates(): Observable<DealerRate[]> {
    return this.http.get<DealerRate[]>(`${this.apiUrl}/dealer-rates`, this.h());
  }
  createDealerRate(dr: DealerRate): Observable<DealerRate> {
    return this.http.post<DealerRate>(`${this.apiUrl}/dealer-rates`, dr, this.h());
  }
  updateDealerRate(dr: DealerRate): Observable<DealerRate> {
    return this.http.put<DealerRate>(`${this.apiUrl}/dealer-rates`, dr, this.h());
  }
  deleteDealerRate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/dealer-rates/${id}`, this.h());
  }
}
