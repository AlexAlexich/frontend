import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  catchError,
  finalize,
  forkJoin,
  map,
  mergeMap,
  Observable,
} from 'rxjs';
import { UserCassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { CreateCasseteModel } from 'src/app/Models/Backend/CreateCasseteModel';
import { UserResponse } from 'src/app/Models/Backend/UserResponse';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { casseteActionInfo } from 'src/app/Models/ReturnInfo';
import { ApiService } from 'src/app/Services/Api/api.service';
class ApiData {
  user: UserResponse;
  cassette: UserCassetteResposne[];
  allCassettes: CreateCasseteModel[];
}

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
  idUser: number;
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
    private api: ApiService,
    private location: Location
  ) {
    super();
  }

  setUserCassetes(id: number): Observable<void> {
    this.dataSource = new MatTableDataSource();

    return this.api.getCasseteByUserId(id).pipe(
      map((x) => {
        this.dataSource.data = x;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (record, filter) => {
          return record.cassette.name
            .toLowerCase()
            .trim()
            .includes(filter.toLowerCase().trim());
        };
      })
    );
  }
  setAllCassettes(): Observable<void> {
    return this.api.getAllCassettes().pipe(
      map((x) => {
        this.allCassettes = x;
      })
    );
  }

  ngOnInit() {
    this.idUser = +(this.router.parseUrl(this.router.url).queryParams as any)
      .id;

    forkJoin([this.setUserCassetes(this.idUser), this.setAllCassettes()])
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((err) => {
          this.errorMsg = err.error.message;
          throw err;
        })
      )
      .subscribe();
  }

  openSidenav(): void {
    this.sidenavOpened = true;
  }
  goBack(): void {
    this.location.back();
  }

  rentCassete(): void {
    let rentInfo = new casseteActionInfo();
    rentInfo.casseteId = parseInt(this.selectedValue);
    rentInfo.userId = this.user.id;
    this.api
      .rentCassete(rentInfo)
      .pipe(
        mergeMap((res) => {
          this.apiCallSuccesfull = true;
          return this.api.getCasseteByUserId(this.user.id);
        }),
        catchError((res) => {
          this.errorMsgSidebar = res.error.message;
          return res;
        })
      )
      .subscribe((res: Array<UserCassetteResposne>) => {
        this.dataSource.data = res;
      });
  }

  changeOpenedToFalse(res: boolean): void {
    this.sidenavOpened = res;
  }
  filterCassete(filterValue: string): void {
    this.dataSource.filter;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  returnCassette(casseteId: number): void {
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
          this.errorMsgSidebar = res.error.message;
          return res;
        })
      )
      .subscribe((res: Array<UserCassetteResposne>) => {
        this.dataSource.data = res;
      });
  }
}
