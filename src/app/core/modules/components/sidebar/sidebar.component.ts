import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;
  currentRoute: string = '';
  activeMenu: string | null = null;
  expandedMenus: { [key: string]: boolean } = {
    setup: false,
    purchase: false,
    sales: false,
    accounts: false,
    inventory: false
  };

  constructor(private router: Router) {
    // Track current route for active state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.autoExpandMenu(event.url);
    });
  }

  ngOnInit(): void {
    // Get initial route
    this.currentRoute = this.router.url;
    this.autoExpandMenu(this.currentRoute);
  }

  // ============================================
  // TOGGLE MENU
  // ============================================
 toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  // ============================================
  // AUTO EXPAND MENU BASED ON ROUTE
  // ============================================
  autoExpandMenu(url: string): void {
    if (url.includes('/users') || url.includes('/roles')) {
      this.expandedMenus['setup'] = true;
    } else if (url.includes('/vendor') || url.includes('/purchase')) {
      this.expandedMenus['purchase'] = true;
    } else if (url.includes('/customer') || url.includes('/sales')) {
      this.expandedMenus['sales'] = true;
    } else if (url.includes('/chart-of-accounts') || url.includes('/payment') || 
               url.includes('/receipt') || url.includes('/cash-book') || 
               url.includes('/accounts-reports')) {
      this.expandedMenus['accounts'] = true;
    } else if (url.includes('/warehouse') || url.includes('/item') || 
               url.includes('/stock') || url.includes('/inventory') || 
               url.includes('/dealer')) {
      this.expandedMenus['inventory'] = true;
    }
  }

  // ============================================
  // CHECK IF ROUTE IS ACTIVE
  // ============================================
  isRouteActive(route: string): boolean {
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  // ============================================
  // TOGGLE COLLAPSE
  // ============================================
    toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}