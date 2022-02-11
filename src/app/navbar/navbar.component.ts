import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../services/authGuard.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authSvc: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    console.log("navbar service: logged in user:" + this.authSvc.loggedInUser);
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/']);
  }
}

