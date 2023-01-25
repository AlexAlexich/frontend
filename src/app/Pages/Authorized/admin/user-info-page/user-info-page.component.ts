import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, mergeMap } from 'rxjs';
import { UserCassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { CreateCasseteModel } from 'src/app/Models/Backend/CreateCasseteModel';
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
  errorMsg: string;
  errorMsgSidebar: string;
  allCassettes: Array<CreateCasseteModel>;

  displayedColumns: string[] = [
    'orderId',

    'name',
    'casseteId',
    'takeDate',
    'returnDate',
  ];

  _paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    paginator: MatPaginator
  ) {
    this._paginator = paginator;

    if (this.dataSource) {
      this.dataSource.paginator = paginator;
    }
  }
  errMsg: string;
  dataSource: MatTableDataSource<UserCassetteResposne>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('matOption') matOption: MatSelect;
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
        this.dataSource = new MatTableDataSource();
        let userRes = res[0];
        let casseteRes = res[1];
        let allCassettes = res[2];
        this.user = new UserResponse();
        this.user = userRes;
        this.dataSource.data = casseteRes;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function (record, filter) {
          return record.cassette.name
            .toLowerCase()
            .trim()
            .includes(filter.toLowerCase().trim());
        };
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
        mergeMap((res) => {
          this.apiCallSuccesfull = true;
          return this.api.getCasseteByUserId(this.user.id);
        }),
        catchError((res) => {
          console.log(res);
          this.errorMsgSidebar = res.error.message;
          return res;
        })
      )
      .subscribe((res: Array<UserCassetteResposne>) => {
        this.dataSource.data = res;
      });
  }

  changeOpenedToFalse(res: boolean) {
    this.sidenavOpened = res;
  }
  filterCassete(filterValue: string): void {
    this.dataSource.filter;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  returnCassette(casseteId: number) {
    let returnInfo = new casseteActionInfo();
    returnInfo.casseteId = casseteId;
    returnInfo.userId = this.user.id;
    this.api
      .returnCassette(returnInfo)
      .pipe(
        mergeMap(() => {
          return this.api.getCasseteByUserId(this.user.id);
        }),
        catchError((res) => {
          console.log(res);
          this.errorMsgSidebar = res.error.message;
          return res;
        })
      )
      .subscribe((res: Array<UserCassetteResposne>) => {
        this.dataSource.data = res;
      });
  }
}
