import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appUsernameValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true}]
})
export class UsernameValidatorDirective implements Validator {

  constructor() { }

  public validate(control: AbstractControl): {[key: string]: any} {
    const usernameRegEx = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9 ]*[._-]?[a-zA-Z0-9 ]+$/i;
    const valid = usernameRegEx.test(control.value);
    return control.value < 1 || valid ? null : {'appUsernameValidator': true};
  }

}
