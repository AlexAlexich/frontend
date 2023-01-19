import { Component, OnInit } from '@angular/core';
import { RegisterInfo } from 'src/app/Models/Backend/RegisterInfo';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
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

  actionDone: boolean = false;
  actionStatus: boolean;

  constructor(private validate: ValidationService, private api: ApiService) {
    super();
  }

  ngOnInit() {}

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
    this.dateOfBirthEmpty = this.validate.validateStrings(this.dateOfBirth, 10);
    if (
      this.firstnameEmpty ||
      this.lastnameEmpty ||
      this.placeOfBirthEmpty ||
      this.passEmpty ||
      this.emailEmpty
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

    this.api.register(regInfo).subscribe((res) => {
      this.actionStatus = res;
      this.actionDone = true;
    });
  }
}
