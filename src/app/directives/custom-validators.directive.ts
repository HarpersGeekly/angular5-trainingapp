import {Directive, Injectable} from '@angular/core';
import {FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, AbstractControl} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import {UserService} from '../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Custom validator functions for reactive form validation
 */
@Directive({
  selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective {
  constructor(public userSvc: UserService) {}

  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
  // password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  username: /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9 ]*[._-]?[a-zA-Z0-9 ]+$/i
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  username: 'Username must be alphanumeric and be between 2 and 20 characters',
  email: 'Email must be a valid email address (username@domain)',
  password: 'Password must be between 8 and 100 characters',
  validPassword: 'Password must contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};

