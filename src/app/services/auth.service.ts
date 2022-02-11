import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class AuthService {
  //jasonwatmore.com/post/2020/07/09/angular-10-jwt-authentication-example-tutorial#authentication-service-ts

  private readonly loggedInUserSubject: BehaviorSubject<User>; //"currentUserSubject"
  public loggedInUser: Observable<User>; //"currentUser"
  private usersUrl = '/api/user'; // URL to rest api, look at file: proxy.conf.json

  constructor(private http: HttpClient) {
    this.loggedInUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserValue(): User {
    return this.loggedInUserSubject.value;
  }

  public get getLoggedInUserSubject(): BehaviorSubject<User> {
    return this.loggedInUserSubject;
  }

  login(user: User) {
    console.log("auth service");
    return this.http.post<any>(this.usersUrl + '/authenticate', user)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.loggedInUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.loggedInUserSubject.next(null);
  }

}
