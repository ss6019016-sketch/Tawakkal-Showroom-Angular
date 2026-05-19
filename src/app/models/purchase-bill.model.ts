export interface PurchaseBillItem {
  itemId?: number;       // ✅ id → itemId
  billId?: number;       // ✅ grouping ke liye
  productId?: number;
  productName: string;
  description?: string;
  qty: number;
  rate: number;
  amount?: number;
}

export interface PurchaseBill {
  billId?: number;           // ✅ id → billId (API se match)
  billNo: string;
  billDate: string;
  vendorId: number | null;
  vendorName?: string;
  totalAmount?: number;
  notes?: string;
  items: PurchaseBillItem[];
}