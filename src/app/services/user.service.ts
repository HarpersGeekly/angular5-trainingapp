import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

const httpOptions =  {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  user: User;
  loggedInUser: User;

  private usersUrl = '/api/user'; // URL to rest api, look at file: proxy.conf.json

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<any>(this.usersUrl + '/authenticate', user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedInUser = null;
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
    return this.http.put<any>(this.usersUrl + '/editUser', JSON.stringify(user), {headers: httpOptions.headers, observe: 'response'});
  }

  delete(id: number) {
    return this.http.delete(this.usersUrl + '/deleteUser/' + id);
  }

}
