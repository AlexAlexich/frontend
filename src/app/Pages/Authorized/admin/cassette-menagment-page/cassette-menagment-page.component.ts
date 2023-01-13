import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';

@Component({
  selector: 'app-cassette-menagment-page',
  templateUrl: './cassette-menagment-page.component.html',
  styleUrls: ['./cassette-menagment-page.component.scss'],
})
export class CassetteMenagmentPageComponent
  extends CommonComponent
  implements OnInit
{
  displayedColumns: string[] = ['id', 'name', 'quantity', 'actions'];
  dataSource: MatTableDataSource<CassetteResposne>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.api.getAllCassettes().subscribe((res) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngAfterViewInit(): void {}
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
