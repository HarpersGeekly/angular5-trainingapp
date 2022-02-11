import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../services/user.service';

export function uniqueUsernameValidator(userSvc: UserService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userSvc.findByUsername(c.value).toPromise().then(user => {
      console.log(user);
      console.log(user !== null);
      return user !== null ? {'alreadyExist': true} : null;
    });
  };
}

@Directive({
  selector: '[appUniqueUsernameValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true}]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {

  constructor(private userSvc: UserService) {
  }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userSvc.findByUsername(c.value).toPromise().then(user => {
      return user !== null ? {'alreadyExist': true} : null;
    });
  }
}
