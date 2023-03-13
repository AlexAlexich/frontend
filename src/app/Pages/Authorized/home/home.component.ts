import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCasseteModel } from 'src/app/Models/Backend/CreateCasseteModel';
import { User } from 'src/app/Models/Backend/User';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends CommonComponent implements OnInit {
  user: User;
  moviesVisible: boolean = false;
  loading: boolean = true;
  displayedColumns: string[] = ['name', 'quantity'];

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
  dataSource: MatTableDataSource<CreateCasseteModel>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public api: ApiService,
    private authorizationService: AuthorizationService
  ) {
    super();
  }
  getUser(): void {
    this.user = this.authorizationService.user;
    // return this.api.getCurrentUser().pipe(
    //   map((x) => {
    //     this.user = x;
    //   })
    // );
  }
  ngOnInit() {
    // this.getUser().subscribe();
    this.getUser();
  }

  openMovies(): void {
    this.moviesVisible = true;
    this.renderMovises();
  }
  closeMovies(): void {
    this.moviesVisible = false;
  }
  filterMovies(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  renderMovises(): void {
    this.api.getAllCassettes().subscribe((res) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (record, filter) => {
        return record.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim());
      };
      this.dataSource.paginator = this._paginator;
      this.loading = false;
    });
  }
}
