import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  constructor(
    public userSvc: UserService,
    private userComponent: UserProfileComponent,
    private router: Router,
    private alertService: AlertService) { }
  userOnForm = new User();
  foundUser: User;
  userExists = false;
  emailExists = false;
  loading = false;

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
        this.loading = true;
        this.userOnForm.id = this.userSvc.user.id;
        this.userOnForm.username = username;
        this.userOnForm.email = this.userSvc.user.email;
        this.userOnForm.bio = this.userSvc.user.bio;
        this.updateUser(this.userOnForm);
        this.userSvc.user.username = username;
        this.userComponent.showEditUserForm = false;
      }
    });
  }

  findByEmailAndUpdate(email) {
    this.userSvc.findByEmail(email).toPromise().then(response => {
      this.foundUser = response;
      console.log('return from REST: ' + this.foundUser);
      if (this.foundUser == null || undefined) {
        this.emailExists = false;
      } else {
        this.emailExists = true;
      }
      console.log('emailexists: ' + this.emailExists);
      if (!this.emailExists) {
        console.log('submitted');
        this.emailExists = false;
        this.loading = true;
        this.userOnForm.id = this.userSvc.user.id;
        this.userOnForm.username = this.userSvc.user.username;
        this.userOnForm.email = email;
        this.userOnForm.bio = this.userSvc.user.bio;
        this.updateUser(this.userOnForm);
        this.userSvc.user.email = email;
        this.userComponent.showEditUserForm = false;
      }
    });
  }

  updateBio(bio) {
    this.userOnForm.id = this.userSvc.user.id;
    this.userOnForm.username = this.userSvc.user.username;
    this.userOnForm.email = this.userSvc.user.email;
    this.userOnForm.bio = bio;
    this.updateUser(this.userOnForm);
    this.userSvc.user.bio = bio;
    this.userComponent.showEditUserForm = false;
  }

  updateUser(user: User) {
    this.userSvc.update(user);
    if (this.userSvc.successfulEdit === true) {
      this.alertService.success('Profile Updated!');
    } else {
      this.alertService.error('Sorry. There was an error when updating your account');
    }
  }

  deleteUser(id: number) {
    this.loading = true;
    this.userSvc.delete(id).subscribe(response => {
      console.log(response);
      this.loading = false;
      this.userSvc.logout();
      this.router.navigate(['/', 'register', {success: true}]);
      this.alertService.success('Sorry to see you go! This account has been deleted and removed from our database', true);
    }, () => {
      this.loading = false;
      this.alertService.error('Sorry. There was an error when deleting your account.');
    });
  }

  ngOnInit() {
    this.loading = false;
  }
}
