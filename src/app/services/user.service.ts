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
  foundUser: User;
  successfulEdit: boolean;
  successfulDelete: boolean;

  private usersUrl = '/api/user'; // URL to rest api, look at file: proxy.conf.json

  constructor(private http: HttpClient) { }

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
    return this.http.get<User>(this.usersUrl + '/email/' + email);
  }

  register(user: User) {
    return this.http.post(this.usersUrl + '/saveUser', user);
  }

  update(user: User) {
    return this.http.put(this.usersUrl + '/editUser',
      JSON.stringify(user), {headers: httpOptions.headers}).subscribe(response => {
      console.log('response ' + response);
    });
  }

  delete(id: number) {
    return this.http.delete(this.usersUrl + '/deleteUser/' + id, {headers: httpOptions.headers}).subscribe();
}

}
