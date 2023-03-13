import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  passRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = new LoginCredentials();
    credentials.Username = this.loginForm.value.email;
    credentials.Password = this.loginForm.value.password;

    this.authorizationService.login(credentials).subscribe((res) => {
      this.loginInvalid = !res;
      if (res) {
        this.router.navigate([`/${ConstService.admin}`]);
      }
    });
  }
}
