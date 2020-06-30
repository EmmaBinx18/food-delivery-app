import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authService.currentUser;
    // const currentRole = this.authService.currentRole;

    // if (currentUser) {
    //   if (route.data.roles && (route.data.roles).indexOf(currentRole) !== -1) {
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
