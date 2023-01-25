export class UserResponse {
  id: number;
  fullName: string;
  email: string;
  roles: [
    {
      id: number;
      name: string;
    }
  ];
}
