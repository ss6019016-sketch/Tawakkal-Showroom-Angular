
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;
  currentRoute: string = '';
  activeMenu: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  get userRole(): string {
    return this.authService.getRole();
  }

  canAccess(roles: string[]): boolean {
    return roles.includes(this.userRole);
  }

  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}