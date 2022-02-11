import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {AuthService} from "../services/auth.service";
import {pipe} from "rxjs";
import {first} from "rxjs/operators";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  constructor(
    public userSvc: UserService,
    public authSvc: AuthService,
    private userComponent: UserProfileComponent,
    private router: Router,
    private alertService: AlertService,
    private snackBar: MatSnackBar) {
  }

  userOnForm = new User();
  foundUser: User;
  userExists = false;
  emailExists = false;
  loading = false;
  loadingUsername = false;
  loadingEmail = false;
  loadingBio = false;

  ngOnInit() {
    //this.userSvc.user = this.userSvc.user;
    this.loading = false;
  }

  onUsernameFormSubmit(username) {
    this.findByUsernameAndUpdate(username);
  }

  onEmailFormSubmit(email) {
    this.findByEmailAndUpdate(email);
  }

  onBioFormSubmit(bio) {
    this.updateBio(bio);
  }

  onChange(value, type) {
    this.userOnForm[type] = value;
  }

  findByUsernameAndUpdate(username) {
    this.userSvc.findByUsername(username).toPromise().then(response => {
      this.foundUser = response;
      if (this.foundUser == null || undefined) {
        this.userExists = false;
      } else {
        this.userExists = true;
      }
      if (!this.userExists) {
        this.userExists = false;
        this.loadingUsername = true;
        this.userOnForm.id = this.userSvc.user.id;
        this.userOnForm.username = username;
        this.userOnForm.email = this.userSvc.user.email;
        this.userOnForm.bio = this.userSvc.user.bio;
        this.updateUser(this.userOnForm);
      }
    });
  }

  findByEmailAndUpdate(email) {
    this.userSvc.findByEmail(email).toPromise().then(response => {
      this.foundUser = response;
      if (this.foundUser == null || undefined) {
        this.emailExists = false;
      } else {
        this.emailExists = true;
      }
      if (!this.emailExists) {
        this.emailExists = false;
        this.loadingEmail = true;
        this.userOnForm.id = this.userSvc.user.id;
        this.userOnForm.username = this.userSvc.user.username;
        this.userOnForm.email = email;
        this.userOnForm.bio = this.userSvc.user.bio;
        this.updateUser(this.userOnForm);
      }
    });
  }

  updateBio(bio) {
    this.loadingBio = true;
    this.userOnForm.id = this.userSvc.user.id;
    this.userOnForm.username = this.userSvc.user.username;
    this.userOnForm.email = this.userSvc.user.email;
    this.userOnForm.bio = bio;
    this.updateUser(this.userOnForm);
  }

  // updateUser(user: User) {
  //   this.authSvc.update(user).subscribe(response => {
  //     // is this overkill? setting the response to THREE users?
  //     this.userSvc.user = response.body,
  //     this.authSvc.loggedInUser = response.body,
  //     this.userComponent.user = response.body;
  //     this.alertService.success('Profile Updated!');
  //     this.userComponent.showEditUserForm = false;
  //     this.loading = false;
  //   }, () => {
  //     this.loading = false;
  //     this.alertService.error('Sorry. There was an error when updating your account');
  //   });
  // }

  updateUser(user: User) {
    this.userSvc.update(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          //this.alertService.success('Profile Updated!');
          this.snackBar.open('Profile Updated!', '', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.userComponent.showEditUserForm = false;
        },
        error: error => {
          this.alertService.error('Sorry. There was an error when updating your account');
          this.loading = false;
        }
      });
  }

  deleteUser(id: number) {
    this.loading = true;
    this.userSvc.delete(id).subscribe(response => {
      this.loading = false;
      this.authSvc.logout();
      this.router.navigate(['/', 'register', {success: true}]);
      this.alertService.success('Sorry to see you go! This account has been deleted and removed from our database', true);
    }, () => {
      this.loading = false;
      this.alertService.error('Sorry. There was an error when deleting your account.');
    });
  }
}
