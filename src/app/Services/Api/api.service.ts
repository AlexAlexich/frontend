import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { catchError, map, Observable } from 'rxjs';
import { LoginResponse } from 'src/app/Models/Backend/LoginResponse';
import { User } from 'src/app/Models/Backend/User';
import { RefreshTokenResponse } from 'src/app/Models/Backend/RefreshTokenResponse';
import { CassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { RegisterInfo } from 'src/app/Models/Backend/RegisterInfo';
import { UserResponse } from 'src/app/Models/Backend/UserResponse';
import { casseteActionInfo } from 'src/app/Models/ReturnInfo';

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
      Email: credentials.Username,
      Password: credentials.Password,
    });
  }

  register(regInfo: RegisterInfo): Observable<boolean> {
    return this.http
      .post(API_KEY + REGISTER_USER, {
        firstName: regInfo.firstName,
        lastName: regInfo.lastName,
        placeOfBirth: regInfo.placeOfBirth,
        dateOfBirth: regInfo.dateOfBirth,
        password: regInfo.password,
        email: regInfo.email,
      })
      .pipe(
        map(() => {
          return true;
        }),
        catchError(async () => {
          return false;
        })
      );
  }

  sendRefreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(API_KEY + REFRESH, {
      refreshToken: refreshToken,
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(API_KEY + GET_CURRENT_USER);
  }

  getAllUsers(): Observable<Array<UserResponse>> {
    return this.http.get<Array<UserResponse>>(API_KEY + USER);
  }
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(API_KEY + GET_USER_BY_ID + `?id=${id}`);
  }
  getAllCassettes(): Observable<Array<CassetteResposne>> {
    return this.http.get<Array<CassetteResposne>>(API_KEY + GET_ALL_CASSETTES);
  }

  getCasseteByUserId(id: number): Observable<Array<CassetteResposne>> {
    return this.http.get<Array<CassetteResposne>>(
      API_KEY + GET_CASSETE_BY_USER_ID + `?id=${id}`
    );
  }
  createCassete(casseteInfo: CassetteResposne): Observable<boolean> {
    return this.http
      .post(API_KEY + CREATE_CASSETE, {
        id: 0,
        name: casseteInfo.name,
        quantity: casseteInfo.quantity,
      })
      .pipe(
        map(() => {
          return true;
        }),
        catchError(async () => {
          return false;
        })
      );
  }
  updateCassete(casseteInfo: CassetteResposne): Observable<boolean> {
    return this.http
      .put(API_KEY + UPDATE_CASSETE + `/${casseteInfo.id}`, {
        id: casseteInfo.id,
        name: casseteInfo.name,
        quantity: casseteInfo.quantity,
      })
      .pipe(
        map(() => {
          return true;
        }),
        catchError(async () => {
          return false;
        })
      );
  }
  returnCassette(returninfo: casseteActionInfo): Observable<boolean> {
    return this.http
      .post(API_KEY + RETURN_CASSETE, {
        casseteId: returninfo.casseteId,
        userId: returninfo.userId,
      })
      .pipe(
        map(() => {
          return true;
        }),
        catchError(async () => {
          return false;
        })
      );
  }
  rentCassete(rentInfo: casseteActionInfo): Observable<boolean> {
    return this.http
      .post(API_KEY + RENT_CASSETTE, {
        casseteId: rentInfo.casseteId,
        userId: rentInfo.userId,
      })
      .pipe(
        map(() => {
          return true;
        })
      );
  }
}
