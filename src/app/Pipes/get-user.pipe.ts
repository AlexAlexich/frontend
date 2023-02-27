import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../Models/Backend/UserResponse';
import { ApiService } from '../Services/Api/api.service';

@Pipe({
  name: 'getUser',
})
export class GetUserPipe implements PipeTransform {
  constructor(public api: ApiService) {}

  transform(id: number): Observable<UserResponse> {
    return this.api.getAllUsers().pipe(
      map((res) => {
        id;
        let i = res.find((x) => {
          return x.id === id;
        });
        return i;
      })
    );
  }
}
