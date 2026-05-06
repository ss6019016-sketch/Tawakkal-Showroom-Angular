import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
     currentUrl: string = '';

  showLayout(): boolean {
    // Login aur register pages par layout hide karo
    const authRoutes = ['/login', '/register', '/signup', '/auth'];
    return !authRoutes.some(route => this.currentUrl.startsWith(route));
  }
  constructor() { }
}