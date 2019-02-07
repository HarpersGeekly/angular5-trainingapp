import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../services/authGuard.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userSvc: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.userSvc.logout();
    this.router.navigate(['/']);
  }
}

