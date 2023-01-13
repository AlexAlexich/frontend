import { Component } from '@angular/core';
import { CommonComponent } from './Models/CommonComponent/CommonComponent.component';
import { CurrentRouteService } from './Services/CurrentRoute/current-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private currentRoute: CurrentRouteService) {}

  onActivate(event: CommonComponent): void {
    this.currentRoute.route = event;
  }
}
