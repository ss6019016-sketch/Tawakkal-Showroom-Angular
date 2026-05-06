// User & Role Models
export interface User {
  userId: number;
  fullName: string;
  email: string;
  username: string;
  phone?: string;
  profilePicture?: string;
  roleId: number;
  role?: Role;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
  address?: string;
  city?: string;
  country?: string;
}

export interface Role {
  roleId: number;
  roleName: string;
  description?: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  createdAt: Date;
}

// Vendor Model
export interface Vendor {
  vendorId: number;
  vendorName: string;
  companyName?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  cnic?: string;
  ntn?: string;
  stn?: string;
  address?: string;
  city?: string;
  country?: string;
  openingBalance: number;
  currentBalance: number;
  isActive: boolean;
  createdAt: Date;
  notes?: string;
}

// Customer Model
export interface Customer {
  customerId: number;
  customerName: string;
  companyName?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  cnic?: string;
  ntn?: string;
  stn?: string;
  address?: string;
  city?: string;
  country?: string;
  creditLimit: number;
  openingBalance: number;
  currentBalance: number;
  isActive: boolean;
  createdAt: Date;
  notes?: string;
}

// Product Models
export interface Category {
  categoryId: number;
  categoryName: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Unit {
  unitId: number;
  unitName: string;
  symbol?: string;
  createdAt: Date;
}

export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  description?: string;
  categoryId: number;
  category?: Category;
  unitId: number;
  unit?: Unit;
  purchasePrice: number;
  salePrice: number;
  dealerPrice: number;
  wholesalePrice: number;
  barcode?: string;
  sku?: string;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
  isActive: boolean;
  createdAt: Date;
  imageUrl?: string;
  taxPercentage: number;
  discountPercentage: number;
  currentStock?: number;
}

// Warehouse & Stock
export interface Warehouse {
  warehouseId: number;
  warehouseName: string;
  address?: string;
  city?: string;
  phone?: string;
  managerName?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Stock {
  stockId: number;
  productId: number;
  product?: Product;
  warehouseId: number;
  warehouse?: Warehouse;
  quantity: number;
  averageCost: number;
  lastUpdated: Date;
  location?: string;
}

// Purchase Models
export interface Purchase {
  purchaseId: number;
  purchaseNo: string;
  purchaseDate: Date;
  vendorId: number;
  vendor?: Vendor;
  vendorInvoiceNo?: string;
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingCharges: number;
  otherCharges: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: string;
  paymentMethod?: string;
  warehouseId: number;
  warehouse?: Warehouse;
  notes?: string;
  termsAndConditions?: string;
  createdBy: number;
  createdAt: Date;
  purchaseDetails?: PurchaseDetail[];
  purchasePayments?: PurchasePayment[];
}

export interface PurchaseDetail {
  purchaseDetailId: number;
  purchaseId: number;
  productId: number;
  product?: Product;
  quantity: number;
  rate: number;
  amount: number;
  taxPercentage: number;
  taxAmount: number;
  discountPercentage: number;
  discountAmount: number;
  netAmount: number;
  description?: string;
}

export interface PurchasePayment {
  paymentId: number;
  paymentNo: string;
  purchaseId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
  referenceNo?: string;
  bankName?: string;
  notes?: string;
  createdBy: number;
  createdAt: Date;
}

// Sales Models
export interface Sale {
  saleId: number;
  invoiceNo: string;
  invoiceDate: Date;
  customerId: number;
  customer?: Customer;
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingCharges: number;
  otherCharges: number;
  grandTotal: number;
  receivedAmount: number;
  dueAmount: number;
  paymentStatus: string;
  paymentMethod?: string;
  warehouseId: number;
  warehouse?: Warehouse;
  notes?: string;
  termsAndConditions?: string;
  dueDate?: Date;
  createdBy: number;
  createdAt: Date;
  isPrinted: boolean;
  saleDetails?: SaleDetail[];
  salePayments?: SalePayment[];
}

export interface SaleDetail {
  saleDetailId: number;
  saleId: number;
  productId: number;
  product?: Product;
  quantity: number;
  rate: number;
  amount: number;
  taxPercentage: number;
  taxAmount: number;
  discountPercentage: number;
  discountAmount: number;
  netAmount: number;
  description?: string;
}

export interface SalePayment {
  paymentId: number;
  receiptNo: string;
  saleId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
  referenceNo?: string;
  bankName?: string;
  notes?: string;
  createdBy: number;
  createdAt: Date;
}

// Account Models
export interface Account {
  accountId: number;
  accountCode: string;
  accountName: string;
  accountType: string;
  accountGroup: string;
  parentAccountId?: number;
  parentAccount?: Account;
  openingBalance: number;
  currentBalance: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  childAccounts?: Account[];
}

export interface PaymentVoucher {
  voucherId: number;
  voucherNo: string;
  voucherDate: Date;
  paymentMode: string;
  payeeName?: string;
  amount: number;
  debitAccountId: number;
  debitAccount?: Account;
  creditAccountId: number;
  creditAccount?: Account;
  chequeNo?: string;
  chequeDate?: Date;
  bankName?: string;
  description?: string;
  notes?: string;
  createdBy: number;
  createdAt: Date;
  approvedBy?: number;
  approvedAt?: Date;
  status: string;
}

export interface ReceiptVoucher {
  voucherId: number;
  voucherNo: string;
  voucherDate: Date;
  receiptMode: string;
  receivedFrom?: string;
  amount: number;
  debitAccountId: number;
  debitAccount?: Account;
  creditAccountId: number;
  creditAccount?: Account;
  chequeNo?: string;
  chequeDate?: Date;
  bankName?: string;
  description?: string;
  notes?: string;
  createdBy: number;
  createdAt: Date;
  approvedBy?: number;
  approvedAt?: Date;
  status: string;
}

// Authentication Models
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Common Models
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

// Dashboard Models
export interface DashboardStats {
  totalSales: number;
  totalPurchases: number;
  totalRevenue: number;
  totalExpenses: number;
  totalCustomers: number;
  totalVendors: number;
  totalProducts: number;
  lowStockProducts: number;
  pendingInvoices: number;
  pendingBills: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}