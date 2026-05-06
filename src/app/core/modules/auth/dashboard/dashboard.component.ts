import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardData } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: DashboardData | null = null;
  loading = true;
  currentUser = '';
  currentDate = new Date();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('userName') || 'Admin';
    this.dashboardService.getData().subscribe({
      next: (res) => { this.data = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  getBarHeight(amount: number, max: number): number {
    if (max === 0) return 0;
    return Math.max(4, Math.round((amount / max) * 100));
  }

  getMaxSales(): number {
    if (!this.data) return 1;
    return Math.max(...this.data.monthlySales.map(m => m.amount), 1);
  }

  getMaxPurchase(): number {
    if (!this.data) return 1;
    return Math.max(...this.data.monthlyPurchase.map(m => m.amount), 1);
  }
}