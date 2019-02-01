import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(
    private userSvc: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userSvc.getUser(id).subscribe(user => this.user = user);
  }

}
