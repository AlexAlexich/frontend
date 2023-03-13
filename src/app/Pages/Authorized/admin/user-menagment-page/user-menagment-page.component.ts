import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisterInfo } from 'src/app/Models/Backend/RegisterInfo';
import { RoleResponse } from 'src/app/Models/Backend/RoleResponse';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { ApiService } from 'src/app/Services/Api/api.service';
import { CommonPopupService } from 'src/app/Services/Popup/common-popup.service';

@Component({
  selector: 'app-user-menagment-page',
  templateUrl: './user-menagment-page.component.html',
  styleUrls: ['./user-menagment-page.component.scss'],
})
export class UserMenagmentPageComponent
  extends CommonComponent
  implements OnInit
{
  roles: Array<RoleResponse>;
  actionDone: boolean = false;
  actionStatus: boolean;
  errorMesage: string;
  loading: boolean = true;
  today = new Date();

  nameRegex: RegExp = /^[A-Z][a-z]{3,19}$/;
  passRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/;
  emptyRole: boolean;

  registerForm = this.fb.group({
    firstname: ['', [Validators.pattern(this.nameRegex), Validators.required]],
    lastname: ['', [Validators.pattern(this.nameRegex), Validators.required]],
    placeOfBirth: [
      '',
      [Validators.pattern(this.nameRegex), Validators.required],
    ],
    password: ['', [Validators.pattern(this.passRegex), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    dateOfBirth: ['', Validators.required],
    role: ['', Validators.required],
  });
  popUpRetrun: boolean;
  constructor(
    private api: ApiService,
    private popUp: CommonPopupService,
    private fb: FormBuilder
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
    if (this.registerForm.invalid) {
      return;
    }
    const regInfo = new RegisterInfo();
    regInfo.firstName = this.registerForm.value.firstname;
    regInfo.lastName = this.registerForm.value.lastname;
    regInfo.placeOfBirth = this.registerForm.value.placeOfBirth;
    regInfo.dateOfBirth = this.registerForm.value.dateOfBirth;
    regInfo.email = this.registerForm.value.email;
    regInfo.password = this.registerForm.value.password;
    regInfo.roles = [
      {
        id: parseInt(this.registerForm.value.role),
        name: this.roles.find(
          (x) => x.id === parseInt(this.registerForm.value.role)
        ).name,
      },
    ];
    this.api
      .register(regInfo)
      .pipe(
        catchError((x) => {
          this.errorMesage = x.error.message;
          console.log(x);
          return of(false);
        })
      )
      .subscribe((res: boolean) => {
        this.actionStatus = res;
        this.actionDone = true;
      });
  }
  override canDeactivate(): Observable<boolean> {
    if (!this.registerForm.touched || this.popUpRetrun) {
      return of(true);
    }
    return this.popUp
      .openPopup(
        'WARNING',
        'You have some unsaved changed, are you sure you want to procceed?'
      )
      .pipe(
        map((res) => {
          this.popUpRetrun = res;
          return res;
        })
      );
  }
}
