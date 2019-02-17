import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  // The login component uses the authentication service to login and logout of the application.
  // It automatically logs the user out when it initializes (ngOnInit) so the login page can also be used to logout.

  model: any = {};
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.userService.login(this.model).toPromise().then(response => {
      if (response && response.token) {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.userService.loggedInUser = response;
        this.router.navigate(['/user/profile/' + this.userService.loggedInUser.id + '/' + this.userService.loggedInUser.username]);
        this.snackBar.open('Login Successful!', '', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      } else {
        this.snackBar.open('Invalid Login Credentials!', '', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
          this.loading = false;
        }
    });
  }
}

