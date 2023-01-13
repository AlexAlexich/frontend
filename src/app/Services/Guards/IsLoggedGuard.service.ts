import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../Auth/authorization.service';
import { ConstService } from '../Const/const.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuardService {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.authorizationService.token) {
      this.router.navigate([`/${ConstService.admin}`]);
      return of(false);
    }
    return of(true);
  }
}
