import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent extends CommonComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
