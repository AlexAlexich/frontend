import { Injectable } from '@angular/core';

@Injectable()
export class ConstService {
  static readonly login: string = 'login';
  static readonly home: string = 'home';
  static readonly admin: string = 'admin';
  static readonly user: string = 'user';
  static readonly profile: string = 'profile';
  static readonly rentCassetes: string = 'rent-cassettes';
  static readonly manageUsers: string = 'manage-users';
  static readonly manageCassettes: string = 'manage-cassettes';
  static readonly userInfo: string = 'user-info';

  constructor() {}
}
