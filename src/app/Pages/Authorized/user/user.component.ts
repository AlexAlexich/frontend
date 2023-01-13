import { Component } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { CurrentRouteService } from 'src/app/Services/CurrentRoute/current-route.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends CommonComponent {
  constructor(private currentRoute: CurrentRouteService) {
    super();
  }
  onActivate(event: CommonComponent): void {
    this.currentRoute.route = event;
  }
}
