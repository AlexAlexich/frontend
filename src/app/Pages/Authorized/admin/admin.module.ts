import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CassetteMenagmentPageComponent } from './cassette-menagment-page/cassette-menagment-page.component';
import { RentCassetesPageComponent } from './rent-cassetes-page/rent-cassetes-page.component';
import { ManageCasseteSidenavComponent } from 'src/app/Widgets/Admin-widgets/manage-cassete-sidenav/manage-cassete-sidenav.component';
import { UserMenagmentPageComponent } from './user-menagment-page/user-menagment-page.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';

@NgModule({
  declarations: [
    AdminComponent,
    CassetteMenagmentPageComponent,
    RentCassetesPageComponent,
    ManageCasseteSidenavComponent,
    UserMenagmentPageComponent,
    UserInfoPageComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
