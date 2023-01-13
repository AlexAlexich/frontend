import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ConstService } from 'src/app/Services/Const/const.service';
import { CurrentRouteService } from 'src/app/Services/CurrentRoute/current-route.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends CommonComponent implements OnInit {
  adminRoutes = [
    {
      name: ConstService.rentCassetes,
    },
    { name: ConstService.manageCassettes },
    {
      name: ConstService.manageUsers,
    },
  ];

  constructor(private currentRoute: CurrentRouteService) {
    super();
  }
  ngOnInit(): void {}

  onActivate(event: CommonComponent): void {
    this.currentRoute.route = event;
  }
}
