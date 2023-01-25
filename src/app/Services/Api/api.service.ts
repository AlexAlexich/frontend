import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/Models/Backend/LoginResponse';
import { User } from 'src/app/Models/Backend/User';
import { RefreshTokenResponse } from 'src/app/Models/Backend/RefreshTokenResponse';
import { UserCassetteResposne } from 'src/app/Models/Backend/CassetteResposne';
import { RegisterInfo } from 'src/app/Models/Backend/RegisterInfo';
import { UserResponse } from 'src/app/Models/Backend/UserResponse';
import { casseteActionInfo } from 'src/app/Models/ReturnInfo';
import { CreateCasseteModel } from 'src/app/Models/Backend/CreateCasseteModel';
import { RoleResponse } from 'src/app/Models/Backend/RoleResponse';
import { CacheService } from '../Cache/cache.service';

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
//Role
const ROLE = 'Role';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_KEY + LOGIN, {
      Email: credentials.Username,
      Password: credentials.Password,
    });
  }

  register(regInfo: RegisterInfo): Observable<boolean> {
    let call = this.http.post(API_KEY + REGISTER_USER, {
      firstName: regInfo.firstName,
      lastName: regInfo.lastName,
      placeOfBirth: regInfo.placeOfBirth,
      dateOfBirth: regInfo.dateOfBirth,
      password: regInfo.password,
      email: regInfo.email,
      roles: regInfo.roles,
    });
    return this.cacheService.executeAndDelete(API_KEY + USER, call);
  }

  sendRefreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(API_KEY + REFRESH, {
      refreshToken: refreshToken,
    });
  }

  getCurrentUser(): Observable<User> {
    let call = this.http.get<User>(API_KEY + GET_CURRENT_USER);
    return this.cacheService.get(API_KEY + GET_CURRENT_USER, call);
  }

  getAllUsers(): Observable<Array<UserResponse>> {
    let call = this.http.get<Array<UserResponse>>(API_KEY + USER);
    return this.cacheService.get(API_KEY + USER, call);
  }
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(API_KEY + GET_USER_BY_ID + `?id=${id}`);
  }
  getAllCassettes(): Observable<Array<CreateCasseteModel>> {
    let call = this.http.get<Array<CreateCasseteModel>>(
      API_KEY + GET_ALL_CASSETTES
    );
    return this.cacheService.get(API_KEY + GET_ALL_CASSETTES, call);
  }

  getCasseteByUserId(id: number): Observable<Array<UserCassetteResposne>> {
    return this.http.get<Array<UserCassetteResposne>>(
      API_KEY + GET_CASSETE_BY_USER_ID + `?id=${id}`
    );
  }
  createCassete(casseteInfo: CreateCasseteModel): Observable<boolean> {
    let call = this.http.post(API_KEY + CREATE_CASSETE, {
      id: 0,
      name: casseteInfo.name,
      quantity: casseteInfo.quantity,
    });

    return this.cacheService.executeAndDelete(
      API_KEY + GET_ALL_CASSETTES,
      call
    );
    // return this.http
    //   .post(API_KEY + CREATE_CASSETE, {
    //     id: 0,
    //     name: casseteInfo.name,
    //     quantity: casseteInfo.quantity,
    //   })
    //   .pipe(
    //     map(() => {
    //       return true;
    //     }),
    //     catchError(async () => {
    //       return false;
    //     })
    //   );
  }
  updateCassete(casseteInfo: CreateCasseteModel): Observable<boolean> {
    let call = this.http.put(API_KEY + UPDATE_CASSETE + `/${casseteInfo.id}`, {
      id: casseteInfo.id,
      name: casseteInfo.name,
      quantity: casseteInfo.quantity,
    });
    return this.cacheService.executeAndDelete(
      API_KEY + GET_ALL_CASSETTES,
      call
    );
    // return this.http
    //   .put(API_KEY + UPDATE_CASSETE + `/${casseteInfo.id}`, {
    //     id: casseteInfo.id,
    //     name: casseteInfo.name,
    //     quantity: casseteInfo.quantity,
    //   })
    //   .pipe(
    //     map(() => {
    //       return true;
    //     }),
    //     catchError(async () => {
    //       return false;
    //     })
    //   );
  }
  returnCassette(returninfo: casseteActionInfo): Observable<boolean> {
    let call = this.http.post(API_KEY + RETURN_CASSETE, {
      casseteId: returninfo.casseteId,
      userId: returninfo.userId,
    });
    return this.cacheService.executeAndDelete(
      API_KEY + GET_ALL_CASSETTES,
      call
    );
    // return this.http
    //   .post(API_KEY + RETURN_CASSETE, {
    //     casseteId: returninfo.casseteId,
    //     userId: returninfo.userId,
    //   })
    //   .pipe(
    //     map(() => {
    //       return true;
    //     }),
    //     catchError(async () => {
    //       return false;
    //     })
    //   );
  }
  rentCassete(rentInfo: casseteActionInfo): Observable<boolean> {
    let call = this.http.post(API_KEY + RENT_CASSETTE, {
      casseteId: rentInfo.casseteId,
      userId: rentInfo.userId,
    });
    return this.cacheService.executeAndDelete(
      API_KEY + GET_ALL_CASSETTES,
      call
    );
    // return this.http
    //   .post(API_KEY + RENT_CASSETTE, {
    //     casseteId: rentInfo.casseteId,
    //     userId: rentInfo.userId,
    //   })
    //   .pipe(
    //     map(() => {
    //       return true;
    //     })
    //   );
  }

  getRoles(): Observable<Array<RoleResponse>> {
    return this.http.get<Array<RoleResponse>>(API_KEY + ROLE);
  }
}
