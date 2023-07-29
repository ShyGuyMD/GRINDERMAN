import { AbstractControl, FormBuilder } from '@angular/forms';
import { passwordValidator } from './customValidators';

describe('passwordValidator', () => {
  const validator = passwordValidator();
  const formBuilder = new FormBuilder();

  it('should return null for an empty password', () => {
    const control = { value: '' } as AbstractControl;
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null for a valid password', () => {
    const validPassword = 'Password@1234';
    const control = { value: validPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return passwordInvalid for an invalid password with missing uppercase letter', () => {
    const invalidPassword = 'password@1234';
    const control = { value: invalidPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toEqual({ passwordInvalid: true });
  });

  it('should return passwordInvalid for an invalid password with missing lowercase letter', () => {
    const invalidPassword = 'PASSWORD@1234';
    const control = { value: invalidPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toEqual({ passwordInvalid: true });
  });

  it('should return passwordInvalid for an invalid password with missing number', () => {
    const invalidPassword = 'Password@abc';
    const control = { value: invalidPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toEqual({ passwordInvalid: true });
  });

  it('should return passwordInvalid for an invalid password with missing special character', () => {
    const invalidPassword = 'Password1234';
    const control = { value: invalidPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toEqual({ passwordInvalid: true });
  });

  it('should return passwordInvalid for an invalid password with length less than 12 characters', () => {
    const invalidPassword = 'Pwd@123';
    const control = { value: invalidPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toEqual({ passwordInvalid: true });
  });

  it('should return null for a valid password with exactly 12 characters', () => {
    const validPassword = 'Pwd@123456789';
    const control = { value: validPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null for a valid password with more than 12 characters', () => {
    const validPassword = 'Pwd@123456789012';
    const control = { value: validPassword } as AbstractControl;
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null for a valid password with the form control password validator', () => {
    const passwordControl = formBuilder.control('Password@1234', passwordValidator());

    expect(passwordControl.valid).toBe(true);
  });

  it('should return passwordInvalid for an invalid password with missing uppercase letter with the form control password validator', () => {
    const passwordControl = formBuilder.control('password@1234', passwordValidator());

    expect(passwordControl.hasError('passwordInvalid')).toBe(true);
  });

});
