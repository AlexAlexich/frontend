import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/Models/Backend/UserResponse';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ConstService } from 'src/app/Services/Const/const.service';

@Component({
  selector: 'app-rent-cassetes-page',
  templateUrl: './rent-cassetes-page.component.html',
  styleUrls: ['./rent-cassetes-page.component.scss'],
})
export class RentCassetesPageComponent
  extends CommonComponent
  implements OnInit
{
  userInfo: string = ConstService.userInfo;
  admin: string;
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource: MatTableDataSource<UserResponse>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private api: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.api.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  filterUsers(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateTo(id: number): void {
    this.router.navigate([`../${this.userInfo}/user`], {
      relativeTo: this.activeRoute,
      queryParams: {
        id: id,
      },
    });
  }
}
