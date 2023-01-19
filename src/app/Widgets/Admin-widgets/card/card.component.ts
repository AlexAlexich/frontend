import { Component, Input, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { casseteActionInfo } from 'src/app/Models/ReturnInfo';
import { ApiService } from 'src/app/Services/Api/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends CommonComponent implements OnInit {
  @Input() casseteId: number;
  @Input() userId: number;
  @Input() name: string;

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {}
  returnCassette() {
    let returnInfo = new casseteActionInfo();
    returnInfo.casseteId = this.casseteId;
    returnInfo.userId = this.userId;
    this.api.returnCassette(returnInfo).subscribe();
  }
}
