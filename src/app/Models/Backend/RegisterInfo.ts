import { RoleResponse } from './RoleResponse';

export class RegisterInfo {
  firstName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  password: string;
  email: string;
  roles: Array<RoleResponse>;
}
