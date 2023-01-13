import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../Widgets/Other-widgets/header/header.component';
import { MatListModule } from '@angular/material/list';
import { ClickOutsideDirective } from '../Directives/ClickOutside.directive';

@NgModule({
  declarations: [HeaderComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    HeaderComponent,
    MatListModule,
  ],
})
export class SharedModule {}
