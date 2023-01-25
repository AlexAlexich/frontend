import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { RegisterInfo } from 'src/app/Models/Backend/RegisterInfo';
import { RoleResponse } from 'src/app/Models/Backend/RoleResponse';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
import { CommonPopupService } from 'src/app/Services/Popup/common-popup.service';
import { ValidationService } from 'src/app/Services/Validation/validation.service';

@Component({
  selector: 'app-user-menagment-page',
  templateUrl: './user-menagment-page.component.html',
  styleUrls: ['./user-menagment-page.component.scss'],
})
export class UserMenagmentPageComponent
  extends CommonComponent
  implements OnInit
{
  firstname: string;
  lastname: string;
  placeOfBirth: string;
  password: string;
  email: string;
  dateOfBirth: string;

  firstnameEmpty: boolean = false;
  lastnameEmpty: boolean = false;
  placeOfBirthEmpty: boolean = false;
  passEmpty: boolean = false;
  emailEmpty: boolean = false;
  dateOfBirthEmpty: boolean;
  roleEmpty: boolean;
  roles: Array<RoleResponse>;
  actionDone: boolean = false;
  actionStatus: boolean;

  loading: boolean = true;
  selectedRoleId: string;
  today = new Date();

  constructor(
    private validate: ValidationService,
    private api: ApiService,
    private popUp: CommonPopupService
  ) {
    super();
  }

  ngOnInit() {
    this.api.getRoles().subscribe((x) => {
      this.roles = x;
      this.loading = false;
    });
  }

  register() {
    this.actionDone = false;
    this.firstnameEmpty = this.validate.validateStrings(this.firstname, 3);
    this.lastnameEmpty = this.validate.validateStrings(this.lastname, 3);
    this.placeOfBirthEmpty = this.validate.validateStrings(
      this.placeOfBirth,
      3
    );
    this.passEmpty = this.validate.validateStrings(this.password, 3);
    this.emailEmpty = this.validate.validateStrings(this.email, 3);
    this.dateOfBirthEmpty = this.validate.validateStrings(this.dateOfBirth, 8);
    if (
      this.firstnameEmpty ||
      this.lastnameEmpty ||
      this.placeOfBirthEmpty ||
      this.passEmpty ||
      this.emailEmpty ||
      !this.selectedRoleId
    ) {
      return;
    }
    const regInfo = new RegisterInfo();
    regInfo.firstName = this.firstname;
    regInfo.lastName = this.lastname;
    regInfo.placeOfBirth = this.placeOfBirth;
    regInfo.dateOfBirth = this.dateOfBirth;
    regInfo.email = this.email;
    regInfo.password = this.password;
    regInfo.roles = [
      {
        id: parseInt(this.selectedRoleId),
        name: this.roles.find((x) => x.id === parseInt(this.selectedRoleId))
          .name,
      },
    ];
    this.api.register(regInfo).subscribe((res) => {
      this.actionStatus = res;
      this.actionDone = true;
    });
  }
  override canDeactivate(): Observable<boolean> {
    let firstnameEmpty = this.validate.validateStrings(this.firstname, 3);
    let lastnameEmpty = this.validate.validateStrings(this.lastname, 3);
    let placeOfBirthEmpty = this.validate.validateStrings(this.placeOfBirth, 3);
    let passEmpty = this.validate.validateStrings(this.password, 3);
    let emailEmpty = this.validate.validateStrings(this.email, 3);
    let dateOfBirthEmpty = this.validate.validateStrings(this.dateOfBirth, 8);
    if (
      firstnameEmpty &&
      lastnameEmpty &&
      placeOfBirthEmpty &&
      passEmpty &&
      emailEmpty &&
      dateOfBirthEmpty &&
      !this.selectedRoleId
    ) {
      return of(true);
    }

    return this.popUp
      .openPopup(
        'WARNING',
        'You have some unsaved changed, are you sure you want to procceed?'
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
