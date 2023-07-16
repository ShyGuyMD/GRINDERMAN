import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value as string;

    if (!password) {
      return null; 
    }

    const uppercaseRegex = /.*[A-Z].*/;
    const lowercaseRegex = /.*[a-z].*/;
    const numberRegex = /.*\d.*/;
    const specialCharRegex = /.*[@#$%^&+=].*/;
    const minLength = 12;

    const isValid =
      password.length >= minLength &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password);

    return isValid ? null : { passwordInvalid: true };
  };
}
