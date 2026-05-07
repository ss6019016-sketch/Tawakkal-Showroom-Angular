import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const roles = route.data['roles'] as Array<string>;

    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);

      return false;
    }

    if (!roles.includes(this.authService.getRole())) {

      this.router.navigate(['/dashboard']);

      return false;
    }

    return true;
  }
}