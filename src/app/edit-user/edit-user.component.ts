import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {AlertService} from '../services/alert.service';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(
    public userSvc: UserService,
    private userComponent: UserProfileComponent,
    private alert: AlertService,
    private router: Router) { }

  submitted = false;
  user = new User();
  existingUser = new Observable<User>();
  userExists = false;

  onSubmit() {
    console.log('submitted');
    console.log('username field:' + this.userSvc.user.username );
    this.user.id = this.userSvc.user.id;
    this.user.username = this.userSvc.user.username;
    this.user.email = this.userSvc.user.email;
    this.user.bio = this.userSvc.user.bio;
    this.existingUser = this.userSvc.findByUsername(this.user.username);
    console.log(this.existingUser.pipe());
    // if (this.existingUser != null) {
    //   this.userExists = true;
    // } else if (this.existingUser == null) {
      this.userSvc.update(this.user);
      // if (this.userSvc.successfulEdit === true) {
        this.alert.success('Profile Successfully Updated!');
      // } else {
      //   this.alert.error('There was an error when updating your profile');
      // }
      this.userComponent.showEditUserForm = false;
      this.submitted = true;
    // }
  }

  deleteUser(user: User) {
    this.userSvc.delete(user);
    if (this.userSvc.successfulDelete === true) {
      this.router.navigate(['/register']);
    } else {
      this.alert.error('Sorry. There was an error when deleting your profile');
    }
  }

  ngOnInit() {}

}
