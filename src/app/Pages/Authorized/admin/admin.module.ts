import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CassetteMenagmentPageComponent } from './cassette-menagment-page/cassette-menagment-page.component';
import { RentCassetesPageComponent } from './rent-cassetes-page/rent-cassetes-page.component';

@NgModule({
  declarations: [
    AdminComponent,
    CassetteMenagmentPageComponent,
    RentCassetesPageComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
