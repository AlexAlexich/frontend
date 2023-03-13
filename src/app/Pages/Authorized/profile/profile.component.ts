import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, forkJoin, finalize, catchError } from 'rxjs';
import { UserCassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { CreateCasseteModel } from 'src/app/Models/Backend/CreateCasseteModel';
import { User } from 'src/app/Models/Backend/User';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends CommonComponent implements OnInit {
  loading: boolean = true;
  errorMsg: string;
  allCassettes: Array<CreateCasseteModel>;
  user: User;
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
    private authorizationService: AuthorizationService,
    private api: ApiService
  ) {
    super();
  }

  getUser(): void {
    this.user = this.authorizationService.user;
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
    this.getUser();

    forkJoin([this.setUserCassetes(this.user.id), this.setAllCassettes()])
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
  filterCassete(filterValue: string): void {
    this.dataSource.filter;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
