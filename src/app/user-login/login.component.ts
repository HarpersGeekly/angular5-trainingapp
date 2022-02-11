import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from "../services/auth.service";

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  // The login component uses the authentication service to login and logout of the application.
  // It automatically logs the user out when it initializes (ngOnInit) so the login page can also be used to logout.

  model: any = {};
  loading = false;
  hidePassword = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    console.log("login returning from backend");
    console.log(this.model);
    this.authService.login(this.model).toPromise().then(response => { //THIS IS USING THE AUTH SERVICE BUT CAN USE THE USER SERVICE: WIP
      console.log("response" + JSON.stringify(response));
      if (response && response.token) {
        //localStorage.setItem('currentUser', JSON.stringify(response.token));
        //sessionStorage.setItem('currentUser', JSON.stringify(response.token));
        //this.userService.loggedInUser = response;
        this.authService.loggedInUser = response;
        //console.log(this.userService.loggedInUser);
        //this.router.navigate(['/user/profile/' + this.userService.loggedInUser.id + '/' + this.userService.loggedInUser.username]);
        this.router.navigate(['/user/profile/' + this.authService.loggedInUserValue.id + '/' + this.authService.loggedInUserValue.username]);
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

