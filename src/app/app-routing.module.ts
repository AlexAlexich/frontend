import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { ConstService } from './Services/Const/const.service';
import { PrivilagesEnum } from './Services/Const/PrivilagesEnum.enum';
import { AuthGuardService } from './Services/Guards/AuthGuard.service';
import { IsLoggedGuardService } from './Services/Guards/IsLoggedGuard.service';

const routes: Routes = [
  {
    path: ConstService.login,
    component: LoginComponent,
    canActivate: [IsLoggedGuardService],
  },
  { path: '', redirectTo: ConstService.login, pathMatch: 'full' },
  {
    path: ConstService.admin,
    loadChildren: () =>
      import('./Pages/Authorized/admin/admin.module').then(
        (m) => m.AdminModule
      ),
    canActivate: [AuthGuardService],
    data: {
      requiredPrivilege: PrivilagesEnum.adminPrivilages,
      navigatePage: ConstService.user,
    },
  },
  {
    path: ConstService.user,
    loadChildren: () =>
      import('./Pages/Authorized/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuardService],
    data: {
      requiredPrivilege: PrivilagesEnum.userPrivilages,
      navigatePage: ConstService.admin,
    },
  },
  { path: '**', redirectTo: ConstService.login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
