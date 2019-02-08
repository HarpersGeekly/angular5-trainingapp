import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {User} from '../models/user';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  user = new User();
  foundUser: User;
  foundEmailUser: User;
  loading = false;
  userExists = false;
  emailExists = false;

  constructor(
    private router: Router,
    private userSvc: UserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    if (!this.userExists) {
      this.userSvc.register(this.user)
        .subscribe(
          data => {
            console.log(data);
            // set success message and pass true parameter to persist the message after redirecting to the login page
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error('There was an error when registering.');
            this.loading = false;
          });
    }
  }

  findByUsername(username) {
  this.userSvc.findByUsername(username).toPromise().then(response => {
      this.foundUser = response;
      if (this.foundUser == null || undefined) {
        this.userExists = false;
      } else {
        this.userExists = true;
        this.loading = false;
      }
    });
  }
  findByEmail(email) {
    this.userSvc.findByEmail(email).toPromise().then(user => {
      this.foundEmailUser = user;
      if (this.foundEmailUser == null || undefined) {
        this.emailExists = false;
      } else {
        this.emailExists = true;
        this.loading = false;
      }
    });
  }
}

