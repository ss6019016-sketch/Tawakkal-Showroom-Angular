export interface PurchaseBillItem {
  id?: string;
  purchaseBillId?: string;
  productName: string;
  description?: string;
  qty: number;
  rate: number;
  amount?: number;
}

export interface PurchaseBill {
  id?: string;
  billNo: string;
  billDate: string;
  vendorId: string;
  vendorName?: string;
  totalAmount?: number;
  notes?: string;
  items: PurchaseBillItem[];
}