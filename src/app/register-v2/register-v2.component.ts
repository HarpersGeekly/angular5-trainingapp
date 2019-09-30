import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ConfirmValidParentMatcher, CustomValidatorsDirective, errorMessages, regExps} from '../directives/custom-validators.directive';
import {UserService} from '../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {uniqueUsernameValidator} from '../directives/unique-username-validator.directive';
import {ErrorStateMatcher} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-register-v2',
  templateUrl: './register-v2.component.html',
  styleUrls: ['./register-v2.component.css']
})
export class RegisterV2Component {
  userRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  emailExists = false; // Form validation - userName taken...
  loading = false;

  constructor(
    private userSvc: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  uniqueUsernameValidator(userSvc: UserService): AsyncValidatorFn {
    return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return userSvc.findByUsername(c.value).toPromise().then(user => {
        console.log(user);
        console.log(user !== null);
        return user !== null ? {'alreadyExist': true} : null;
      });
    };
  }
  // private validateUsername(control: AbstractControl) {
  //   return this.userSvc.findByUsername(control.value)
  //     .subscribe(res => {
  //
  //         // If the condition is met then call the isTaken function below.
  //         if (res.username === control.value) {
  //           console.log('get here');
  //           return ({usernameTaken: true});
  //         } else {
  //           return ({usernameTaken: false});
  //         }
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.log(err.message);
  //       }
  //     );
  // }
  //
  // private validateEmail(email) {
  //   return this.userSvc.findByEmail(email)
  //     .subscribe(res => {
  //       console.log(email);
  //       console.log(res.email);
  //       console.log(res.email === email);
  //       if (res.email === email) {
  //         this.emailExists = true;
  //       } else {
  //         this.emailExists = false;
  //       }
  //         // If the condition is met then call the isTaken function below.
  //         // return res.email === email ? this.emailExists = true : false;
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.log(err.error);
  //         console.log(err.message);
  //       }
  //     );
  // }

  getErrorMessage() {
    return this.userRegistrationForm.controls['username'].hasError('required') ? 'Username is required' :
      this.userRegistrationForm.controls['username'].hasError('pattern') ? 'Username must be alphanumeric' :
      this.userRegistrationForm.controls['username'].hasError('maxLength') ? 'Required length is at most 20 characters' :
        this.userRegistrationForm.controls['username'].hasError('minLength') ? 'Required length is at least 2 characters' :
        this.userRegistrationForm.controls['username'].hasError('alreadyExist') ? 'That user already exists' :
          '';
  }

  register() {
    console.log(this.userRegistrationForm.valid);
  }

  get username() {
    return this.userRegistrationForm.get('username');
  }
  get email() {
    return this.userRegistrationForm.get('email');
  }
  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      username: ['',
        [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(/(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9 ]*[._-]?[a-zA-Z0-9 ]+$/i)],
          [this.uniqueUsernameValidator(this.userSvc)] // async validator
    ],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(regExps.email)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(regExps.password)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: CustomValidatorsDirective.childrenEqual});
  }
}

//
// public usernameIsTaken() {
//   this.usernameExists = true;  // Var is bound to html conditional.

  // Remove the already in database message after some time.
  // setTimeout (() => {
  //   this.usernameExists = false;
  // }, 2000);

  // Clear the field to reset validation and prepare for next attempt.
  // this.userRegistrationForm.controls['username']
  //   .setValue(null);
// }
