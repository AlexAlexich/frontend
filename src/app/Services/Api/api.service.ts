import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/Models/Backend/LoginResponse';
import { User } from 'src/app/Models/Backend/User';
import { RefreshTokenResponse } from 'src/app/Models/Backend/RefreshTokenResponse';
import { CassetteResposne } from 'src/app/Models/Backend/CassetteResposne';

const API_KEY = 'https://localhost:7136/api/';
//Authentication
const LOGIN = 'Authentication/login';
const REFRESH = 'Authentication/refresh';
const logout = 'Authentication/logout';
//Cassette
const RENT_CASSETTE = 'Cassette/rentCassete';
const RETURN_CASSETE = 'Cassette/returnCassete';
const CREATE_CASSETE = 'Cassette/createCassete';
const UPDATE_CASSETE = 'Cassette/updateCassete';
const GET_ALL_CASSETTES = 'Cassette/GetAllCassettes';
const GET_CURRENT_USER_CASSETTES = 'Cassette/GetCurrentUsersCassettes';
const GET_CASSETE_BY_USER_ID = 'Cassette/GetCassettesByUserId';
//User
const USER = 'User';
const GET_USER_BY_ID = 'User/getById';
const GET_CURRENT_USER = 'User/getCurrent';
const REGISTER_USER = 'User/register';
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_KEY + LOGIN, {
      Username: credentials.Username,
      Password: credentials.Password,
    });
  }

  sendRefreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(API_KEY + REFRESH, {
      refreshToken: refreshToken,
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(API_KEY + GET_CURRENT_USER);
  }

  getAllCassettes(): Observable<Array<CassetteResposne>> {
    return this.http.get<Array<CassetteResposne>>(API_KEY + GET_ALL_CASSETTES);
  }
}
