import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }
  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('User_details'));

    if (currentUser) {
      // if (route.data && route.data.roles) {
      //   if (route.data.roles.includes(currentUser.role)) {
      //     return true;
      //   } else {
      //     this.router.navigate(['/unauthorized']);
      //     return false;
      //   }
      // } else {
      //   return true;
      // }
      if (currentUser.user_id > 0) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('User_details'));

    if (currentUser) {
      // if (route.data && route.data.roles) {
      //   if (route.data.roles.includes(currentUser.role)) {
      //     return true;
      //   } else {
      //     this.router.navigate(['/unauthorized']);
      //     return false;
      //   }
      // } else {
      //   return true;
      // }
      if (currentUser.user_id > 0) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
