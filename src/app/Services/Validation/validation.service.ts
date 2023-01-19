import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  validateStrings(variable: string, validationLenght: number): boolean {
    if (!variable || variable.length < validationLenght) {
      return true;
    }
    return false;
  }
  validateNumbers(variable: string): boolean {
    const regex = /^[0-9]*$/;
    if (!variable || !regex.test(variable)) {
      return true;
    }
    return false;
  }
}
