export interface SalesInvoiceItem {
  id?: string;
  salesInvoiceId?: string;
  productName: string;
  description?: string;
  qty: number;
  rate: number;
  amount?: number;
}

export interface SalesInvoice {
  id?: string;
  invoiceNo: string;
  invoiceDate: string;
  customerId: string;
  customerName?: string;
  totalAmount?: number;
  notes?: string;
  items: SalesInvoiceItem[];
}