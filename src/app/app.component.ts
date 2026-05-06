import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUrl: string = '';

  constructor(private router: Router) {
    // Track current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('Current URL:', this.currentUrl); // Debug ke liye
      }
    });
  }

  showLayout(): boolean {
    // Login aur register pages par layout hide karo
    const authRoutes = ['/login', '/register', '/signup', '/auth'];
    return !authRoutes.some(route => this.currentUrl.startsWith(route));
  }
}