import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, mergeMap } from 'rxjs';
import { CassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { UserResponse } from 'src/app/Models/Backend/UserResponse';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { casseteActionInfo } from 'src/app/Models/ReturnInfo';
import { ApiService } from 'src/app/Services/Api/api.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss'],
})
export class UserInfoPageComponent extends CommonComponent implements OnInit {
  loading: boolean = true;
  sidenavOpened: boolean = false;
  selectedValue: string;
  apiCallDone: boolean = false;
  apiCallSuccesfull: boolean = false;
  url: string = this.router.url;
  user: UserResponse;
  cassettes: Array<CassetteResposne>;
  errorMsg: string;
  errorMsgSidebar: string;
  allCassettes: Array<CassetteResposne>;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.queryParams
      .pipe(
        mergeMap((res) => {
          return forkJoin([
            this.api.getUserById(res['id']),
            this.api.getCasseteByUserId(res['id']),
            this.api.getAllCassettes(),
          ]);
        }),
        catchError((res) => {
          this.errorMsg = res.error.message;
          this.loading = false;
          return res;
        })
      )
      .subscribe((res) => {
        console.log(res);
        let userRes = res[0];
        let casseteRes = res[1];
        let allCassettes = res[2];
        this.user = new UserResponse();
        this.user = userRes;
        this.cassettes = casseteRes;
        this.allCassettes = allCassettes;
        this.loading = false;
      });
  }

  openSidenav() {
    this.sidenavOpened = true;
  }
  goBack() {
    this.location.back();
  }

  rentCassete() {
    let rentInfo = new casseteActionInfo();
    rentInfo.casseteId = parseInt(this.selectedValue);
    rentInfo.userId = this.user.id;
    console.log(this.selectedValue);
    this.api
      .rentCassete(rentInfo)
      .pipe(
        catchError((res) => {
          console.log(res);
          this.errorMsgSidebar = res.error.message;
          return res;
        })
      )
      .subscribe(() => {
        this.apiCallSuccesfull = true;
      });
  }

  changeOpenedToFalse(res: boolean) {
    this.sidenavOpened = res;
  }
}
