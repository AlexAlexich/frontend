import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

@Component({
  selector: 'app-user-menagment-page',
  templateUrl: './user-menagment-page.component.html',
  styleUrls: ['./user-menagment-page.component.scss'],
})
export class UserMenagmentPageComponent
  extends CommonComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {}
}
