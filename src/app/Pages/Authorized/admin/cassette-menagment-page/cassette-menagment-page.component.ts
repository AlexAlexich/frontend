import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCasseteModel } from 'src/app/Models/Backend/CreateCasseteModel';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
import { ValidationService } from 'src/app/Services/Validation/validation.service';

@Component({
  selector: 'app-cassette-menagment-page',
  templateUrl: './cassette-menagment-page.component.html',
  styleUrls: ['./cassette-menagment-page.component.scss'],
})
export class CassetteMenagmentPageComponent
  extends CommonComponent
  implements OnInit
{
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'actions'];
  timeout: any;
  dataSource: MatTableDataSource<CreateCasseteModel>;
  @ViewChild(MatSort) sort: MatSort;

  shouldAdd: boolean = false;
  shouldEdit: boolean = false;
  cassette: CreateCasseteModel;
  casseteName: string;
  casseteQuantity: string;
  actionStatus: boolean;
  actionDone: boolean;
  casseteEmpty: boolean;
  casseteQuantityEmpty: boolean;

  _paginator: MatPaginator;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    paginator: MatPaginator
  ) {
    this._paginator = paginator;

    if (this.dataSource) {
      this.dataSource.paginator = paginator;
    }
  }

  constructor(private api: ApiService, private validate: ValidationService) {
    super();
  }
  sidenavOpened = false;
  changeOpenToFalse(res: boolean) {
    this.sidenavOpened = res;
  }
  openSidenav(
    openCase: string,
    cassete: CreateCasseteModel = { id: null, name: null, quantity: null }
  ) {
    if (openCase === 'add') {
      this.shouldAdd = true;
      this.shouldEdit = false;
    } else {
      this.cassette = cassete;
      this.shouldAdd = false;
      this.shouldEdit = true;
    }
    this.sidenavOpened = !this.sidenavOpened;
  }
  ngOnInit() {
    this.renderMovises();
  }
  renderMovises(): void {
    this.api.getAllCassettes().subscribe((res) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function (record, filter) {
        return record.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim());
      };
      this.dataSource.paginator = this._paginator;
      this.loading = false;
    });
  }
  filterMovies(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createCassete(): void {
    this.actionDone = false;
    this.casseteEmpty = this.validate.validateStrings(this.casseteName, 2);
    this.casseteQuantityEmpty = this.validate.validateNumbers(
      this.casseteQuantity
    );
    if (this.casseteEmpty || this.casseteQuantityEmpty) {
      return;
    }
    const cassete = new CreateCasseteModel();
    cassete.id = 0;
    cassete.name = this.casseteName;
    cassete.quantity = parseInt(this.casseteQuantity);
    this.api.createCassete(cassete).subscribe((res) => {
      this.actionStatus = res;
      this.actionDone = true;
      if (res) {
        this.casseteName = null;
        this.casseteQuantity = null;
        this.renderMovises();
      }
    });
  }
  editCassete(): void {
    this.actionDone = false;
    this.casseteEmpty = this.validate.validateStrings(this.casseteName, 2);
    this.casseteQuantityEmpty = this.validate.validateNumbers(
      this.casseteQuantity
    );
    if (this.casseteEmpty || this.casseteQuantityEmpty) {
      return;
    }
    const cassete = new CreateCasseteModel();
    cassete.id = this.cassette.id;
    cassete.name = this.casseteName;
    cassete.quantity = parseInt(this.casseteQuantity);
    this.api.updateCassete(cassete).subscribe((res) => {
      this.actionStatus = res;
      this.actionDone = true;
      if (res) {
        this.casseteName = null;
        this.casseteQuantity = null;
        this.cassette = cassete;
        this.renderMovises();
      }
    });
  }
}
