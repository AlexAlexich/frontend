import { Injectable } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

@Injectable({
  providedIn: 'root',
})
export class CurrentRouteService {
  route: CommonComponent;

  constructor() {}
}
