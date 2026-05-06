export interface DashboardData {
  totalSalesToday: number;
  totalPurchaseToday: number;
  totalSalesMonth: number;
  totalPurchaseMonth: number;
  totalCustomers: number;
  totalVendors: number;
  totalProducts: number;
  totalUsers: number;
  cashBalance: number;
  stockValue: number;
  recentPurchases: RecentBill[];
  recentSales: RecentBill[];
  monthlySales: MonthlyData[];
  monthlyPurchase: MonthlyData[];
}

export interface RecentBill {
  no: string;
  partyName: string;
  date: string;
  amount: number;
}

export interface MonthlyData {
  month: string;
  amount: number;
}