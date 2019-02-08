import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(
    public userSvc: UserService,
    private userComponent: UserProfileComponent,
    private router: Router,
    private alertService: AlertService) { }
  userOnForm = new User();
  foundUser: User;
  userExists = false;
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
      console.log(response);
      console.log('return from REST: ' + this.foundUser);
      if (this.foundUser == null || undefined) {
        this.userExists = false;
      } else {
        this.userExists = true;
      }
      console.log('userexists: ' + this.userExists);
      if (!this.userExists) {
        console.log('submitted');
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
        this.userExists = false;
      } else {
        this.userExists = true;
      }
      console.log('userexists: ' + this.userExists);
      if (!this.userExists) {
        console.log('submitted');
        this.userExists = false;
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
  }

  deleteUser(id: number) {
    this.userSvc.delete(id);
    if (this.userSvc.successfulDelete === true) {
      this.userSvc.logout();
      this.router.navigate(['/', 'register', {success: true}]);
      this.alertService.success('Sorry to see you go! This account has been successfully deleted and removed from our database', true);
    } else {

    }
  }

  ngOnInit() {
    this.loading = false;
  }
}
