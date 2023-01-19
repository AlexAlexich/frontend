import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';
import { ConstService } from 'src/app/Services/Const/const.service';
import { ValidationService } from 'src/app/Services/Validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends CommonComponent implements OnInit {
  password: string;
  username: string;
  userEmpty: boolean = false;
  passEmpty: boolean = false;
  loginInvalid: boolean = false;
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private validationService: ValidationService
  ) {
    super();
  }

  ngOnInit() {}

  login(): void {
    this.userEmpty = this.validationService.validateStrings(this.username, 3);
    this.passEmpty = this.validationService.validateStrings(this.password, 3);
    if (this.passEmpty || this.userEmpty) {
      return;
    }
    const credentials = new LoginCredentials();
    credentials.Username = this.username;
    credentials.Password = this.password;

    this.authorizationService.login(credentials).subscribe((res) => {
      this.loginInvalid = !res;
      if (res) {
        this.router.navigate([`/${ConstService.admin}`]);
      }
    });
  }
}
