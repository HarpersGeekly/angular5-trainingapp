import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userSvc: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userSvc.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(users); // .subscribe() is like .then(), response is users that I assign to the variable users
      });
  }

}
