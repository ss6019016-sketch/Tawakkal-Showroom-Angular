export interface Warehouse {
  id?: string;
  name: string;
  location?: string;
  description?: string;
  isDefault: boolean;
}

export interface StockLedger {
  id?: string;
  productId: string;
  productName?: string;
  warehouseId: string;
  warehouseName?: string;
  transactionType: number;
  transactionTypeName?: string;
  referenceNo?: string;
  transactionDate: string;
  qtyIn: number;
  qtyOut: number;
  rate: number;
  notes?: string;
}

export interface StockInHand {
  productId: string;
  productName: string;
  unit?: string;
  warehouseId: string;
  warehouseName: string;
  totalQtyIn: number;
  totalQtyOut: number;
  stockBalance: number;
  rate: number;
  stockValue: number;
}

export interface StockAdjustmentItem {
  id?: string;
  productId: string;
  productName?: string;
  qtyIn: number;
  qtyOut: number;
  rate: number;
  notes?: string;
}

export interface StockAdjustment {
  id?: string;
  adjustmentNo?: string;
  adjustmentDate: string;
  warehouseId: string;
  warehouseName?: string;
  notes?: string;
  items: StockAdjustmentItem[];
}

export interface DealerRate {
  id?: string;
  productId: string;
  productName?: string;
  dealerName: string;
  rate: number;
  notes?: string;
}
