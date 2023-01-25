import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstService } from 'src/app/Services/Const/const.service';
import { PrivilagesEnum } from 'src/app/Services/Const/PrivilagesEnum.enum';
import { AuthGuardService } from 'src/app/Services/Guards/AuthGuard.service';
import { LeaveGuardService } from 'src/app/Services/Guards/LeaveGuard.service';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { AdminComponent } from './admin.component';
import { CassetteMenagmentPageComponent } from './cassette-menagment-page/cassette-menagment-page.component';
import { RentCassetesPageComponent } from './rent-cassetes-page/rent-cassetes-page.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserMenagmentPageComponent } from './user-menagment-page/user-menagment-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [LeaveGuardService],
    data: {
      requiredPrivilege: PrivilagesEnum.adminPrivilages,
      navigatePage: ConstService.user,
    },
    children: [
      { path: '', redirectTo: ConstService.home, pathMatch: 'full' },
      {
        path: ConstService.home,
        component: HomeComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.adminPrivilages,
          navigatePage: ConstService.user,
        },
      },
      {
        path: ConstService.profile,
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.adminPrivilages,
          navigatePage: ConstService.user,
        },
      },
      {
        path: ConstService.manageCassettes,
        component: CassetteMenagmentPageComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.adminPrivilages,
          navigatePage: ConstService.user,
        },
      },
      {
        path: ConstService.manageUsers,
        component: UserMenagmentPageComponent,
        canActivate: [AuthGuardService],
        canDeactivate: [LeaveGuardService],

        data: {
          requiredPrivilege: PrivilagesEnum.adminHrPrivilages,
          navigatePage: ConstService.user,
        },
      },
      {
        path: ConstService.rentCassetes,
        component: RentCassetesPageComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.adminPrivilages,
          navigatePage: ConstService.user,
        },
      },
      {
        path: `${ConstService.userInfo}/:id`,
        component: UserInfoPageComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.adminPrivilages,
          navigatePage: ConstService.user,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
