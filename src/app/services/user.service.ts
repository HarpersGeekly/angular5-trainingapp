import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  user: User;

  private usersUrl = '/api/user'; // URL to rest api, look at file: proxy.conf.json

  constructor(private http: HttpClient, private authSvc: AuthService) {
  }

  register(user: User) {
    return this.http.post(this.usersUrl + '/saveUser', user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + '/users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/id/' + id);
  }

  findByUsername(username: string) {
    return this.http.get<User>(this.usersUrl + '/username/' + username);
  }

  findByEmail(email: string) {
    return this.http.get<User>(this.usersUrl + '/email?email=' + email);
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(this.usersUrl + '/editUser', JSON.stringify(user), {
      headers: httpOptions.headers,
      observe: 'response'
    }).pipe(map(x => {
      // update stored user if the logged in user updated their own record
      if (user.id == this.authSvc.loggedInUserValue.id) {
        // update local storage
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        this.authSvc.getLoggedInUserSubject.next(user);
      }
      return x;
    }));
  }

  // update(user: User): Observable<any> {
  //   return this.http.put<any>(this.usersUrl + '/editUser', JSON.stringify(user), {
  //     headers: httpOptions.headers,
  //     observe: 'response'
  //   });
  // }

  delete(id: number) {
    return this.http.delete(this.usersUrl + '/deleteUser/' + id);
  }

}
