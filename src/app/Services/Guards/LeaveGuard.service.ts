import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

type NewType = RouterStateSnapshot;

@Injectable({
  providedIn: 'root',
})
export class LeaveGuardService implements CanDeactivate<CommonComponent> {
  constructor() {}
  canDeactivate(
    component: CommonComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: NewType
  ): Observable<boolean> {
    return component.canDeactivate();
  }
}
