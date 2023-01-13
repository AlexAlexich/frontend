import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends CommonComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
