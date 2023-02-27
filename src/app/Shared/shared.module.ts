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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DebounceInputDirective } from '../Directives/DebounceInput.directive';
import { LoaderComponent } from '../Widgets/Other-widgets/loader/loader.component';
import { CardComponent } from '../Widgets/Admin-widgets/card/card.component';
import { GetUserNameEmailPipe } from '../Pipes/get-user-name-email.pipe';
import { GetUserPipe } from '../Pipes/get-user.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    ClickOutsideDirective,
    DebounceInputDirective,
    LoaderComponent,
    CardComponent,
    GetUserNameEmailPipe,
    GetUserPipe,
  ],
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    GetUserNameEmailPipe,
    GetUserPipe,
    CardComponent,
    LoaderComponent,
    ClickOutsideDirective,
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
    MatDatepickerModule,
    MatNativeDateModule,
    DebounceInputDirective,
  ],
})
export class SharedModule {}
