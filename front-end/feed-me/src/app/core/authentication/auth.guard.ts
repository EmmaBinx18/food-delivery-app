import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // if (this.authService.isLoggedIn()) {
    //   if (route.data.roles && (route.data.roles).indexOf(this.authService.getCurrentRole()) === -1) {
    //     this.router.navigate(['/home']);
    //     return false;
    //   }

    //   return true;
    // }

    // this.router.navigate(['/login']);
    // return false;
    return true;
  }

}
