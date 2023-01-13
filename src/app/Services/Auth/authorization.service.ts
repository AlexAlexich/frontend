import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { User } from 'src/app/Models/Backend/User';
import { ApiService } from '../Api/api.service';
import { ConstService } from '../Const/const.service';

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refresh';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _token: string;
  private _refreshToken: string;
  private _user: User;

  get user(): User {
    return JSON.parse(JSON.stringify(this._user));
  }

  get token(): string {
    return this._token;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }

  get isAuthorizated(): boolean {
    return !!this._token;
  }

  get isAuthenticated(): boolean {
    console.log(this._user);
    console.log(!!this._user);
    return !!this._user;
  }

  constructor(private api: ApiService, private router: Router) {}

  saveToken(token: string, refreshToken: string): void {
    this._token = token;
    this._refreshToken = refreshToken;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(REFRESH_KEY, refreshToken);
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.api.login(credentials).pipe(
      tap((res) => {
        this.saveToken(res.token, res.refreshToken);
      }),
      map(() => true),
      catchError(async () => false)
    );
  }
  sendRefreshToken(): Observable<void> {
    return this.api.sendRefreshToken(this._refreshToken).pipe(
      map((res) => {
        this.saveToken(res.token, res.refreshToken);
      })
    );
  }
  setCurrentUser(): Observable<void> {
    return this.api.getCurrentUser().pipe(
      map((res) => {
        this._user = res;
      })
    );
  }

  logout(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
    this._refreshToken = null;
    this._token = null;
    this._user = null;
    this.router.navigate([`/${ConstService.login}`]);
  }

  hasPrivilage(privilage: number): boolean {
    return this._user.permissionIds.includes(privilage);
  }

  initService(): void {
    this._refreshToken = window.localStorage.getItem(REFRESH_KEY);
    this._token = window.localStorage.getItem(TOKEN_KEY);
  }
}
