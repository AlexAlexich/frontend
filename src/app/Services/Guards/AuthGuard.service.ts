import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthorizationService } from '../Auth/authorization.service';
import { ConstService } from '../Const/const.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authorizationService.isAuthorizated) {
      this.router.navigate[`/${ConstService.login}`];
      this.authorizationService.logout();
      return of(false);
    }
    if (this.authorizationService.isAuthenticated) {
      return this.validatePermission(route);
    }
    return this.authorizationService.setCurrentUser().pipe(
      map(() => {
        return true;
      })
    );
  }

  validatePermission(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPrivilege = route.data['requiredPrivilege'];
    const pageToNavigate = route.data['navigatePage'];

    if (!this.authorizationService.hasPrivilage(requiredPrivilege)) {
      this.router.navigate([`/${pageToNavigate}`]);
    }
    return of(true);
  }
}
