import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';
import { ConstService } from 'src/app/Services/Const/const.service';

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
    private router: Router
  ) {
    super();
  }

  ngOnInit() {}

  login() {
    this.checkUsername();
    this.checkPassword();
    if (this.passEmpty || this.userEmpty) {
      return;
    }
    const credentials = new LoginCredentials();
    credentials.Username = this.username;
    credentials.Password = this.password;

    this.authorizationService
      .login(credentials)
      .pipe(tap((res) => {}))
      .subscribe((res) => {
        this.loginInvalid = !res;
        if (res) {
          this.router.navigate([`/${ConstService.admin}`]);
        }
      });
  }
  checkUsername(): void {
    if (!this.username || this.username.length < 3) {
      this.userEmpty = true;
      return;
    }
    this.userEmpty = false;
  }
  checkPassword(): void {
    if (!this.password || this.password.length < 3) {
      this.passEmpty = true;
      return;
    }
    this.passEmpty = false;
  }
}
