export class UserCassetteResposne {
  id: number;
  userId: number;
  takeDate: string;
  returnDate: string;
  cassette: {
    id: number;
    name: string;
    quantity: number;
  };
}
