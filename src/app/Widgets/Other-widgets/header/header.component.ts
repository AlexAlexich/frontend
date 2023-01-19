import { Component, OnInit } from '@angular/core';
import { ConstService } from 'src/app/Services/Const/const.service';
import { FormBuilder } from '@angular/forms';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { CurrentRouteService } from 'src/app/Services/CurrentRoute/current-route.service';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';
import { User } from 'src/app/Models/Backend/User';
import { PrivilagesEnum } from 'src/app/Services/Const/PrivilagesEnum.enum';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends CommonComponent implements OnInit {
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  home: string = ConstService.home;
  profile: string = ConstService.profile;
  user: User;
  adminPrivilegies = PrivilagesEnum.adminPrivilages;
  adminHrPrivilegies = PrivilagesEnum.adminHrPrivilages;

  rentRoute = ConstService.rentCassetes;
  manageCassetteRoute = ConstService.manageCassettes;
  manageUserRoute = ConstService.manageUsers;
  ngOnInit(): void {
    this.user = this.authorizationService.user;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private currentRoute: CurrentRouteService
  ) {
    super();
  }

  logout(): void {
    this.currentRoute.route.canDeactivate().subscribe((res) => {
      if (res) {
        this.authorizationService.logout();
        return;
      }
    });
  }
}
