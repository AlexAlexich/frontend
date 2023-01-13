import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';

@Component({
  selector: 'app-rent-cassetes-page',
  templateUrl: './rent-cassetes-page.component.html',
  styleUrls: ['./rent-cassetes-page.component.scss'],
})
export class RentCassetesPageComponent
  extends CommonComponent
  implements OnInit
{
  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {}
}
