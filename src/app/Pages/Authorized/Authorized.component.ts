import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

@Component({
  selector: 'app-Authorized',
  templateUrl: './Authorized.component.html',
  styleUrls: ['./Authorized.component.scss'],
})
export class AuthorizedComponent extends CommonComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
