import { Pipe, PipeTransform } from '@angular/core';
import { UserResponse } from '../Models/Backend/UserResponse';

@Pipe({
  name: 'getUserNameEmail',
})
export class GetUserNameEmailPipe implements PipeTransform {
  transform(value: UserResponse): string {
    return `${value.id}. ${value.fullName} -  ${value.email}`;
  }
}
