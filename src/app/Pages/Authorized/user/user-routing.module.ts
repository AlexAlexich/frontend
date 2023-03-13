import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstService } from 'src/app/Services/Const/const.service';
import { AuthGuardService } from 'src/app/Services/Guards/AuthGuard.service';
import { UserComponent } from './user.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { PrivilagesEnum } from 'src/app/Services/Const/PrivilagesEnum.enum';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuardService],
    data: {
      requiredPrivilege: PrivilagesEnum.userPrivilages,
      navigatePage: ConstService.user,
    },
    children: [
      { path: '', redirectTo: ConstService.home, pathMatch: 'full' },
      {
        path: ConstService.home,
        component: HomeComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.userPrivilages,
          navigatePage: ConstService.user,
        },
      },
      {
        path: ConstService.profile,
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        data: {
          requiredPrivilege: PrivilagesEnum.userPrivilages,
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
export class UserRoutingModule {}
