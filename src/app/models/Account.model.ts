export interface Account {
  id?: string;
  code: string;
  name: string;
  accountType: number;
  accountTypeName?: string;
  description?: string;
  isSystem?: boolean;
  balance?: number;
}

export interface VoucherEntry {
  id?: string;
  voucherId?: string;
  accountId: string;
  accountName?: string;
  accountCode?: string;
  description?: string;
  debit: number;
  credit: number;
}

export interface Voucher {
  id?: string;
  voucherNo?: string;
  voucherType: number;
  voucherTypeName?: string;
  voucherDate: string;
  description?: string;
  totalAmount?: number;
  entries: VoucherEntry[];
}