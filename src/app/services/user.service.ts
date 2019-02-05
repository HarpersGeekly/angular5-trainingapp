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
  successfulEdit: boolean;
  successfulDelete: boolean;

  private usersUrl = 'http://localhost:8888/api/user';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/id/' + id);
  }

  findByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/username/' + username);
  }

  findByEmail(email: string): Observable<User> {
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

  delete(user: User) {
    return this.http.post(this.usersUrl + '/deleteUser', JSON.stringify(user), {headers: httpOptions.headers}).subscribe(response => {
      if (this.getUser(user.id) == null) {
        this.successfulDelete = true;
      }
      console.log('response ' + response);
    });
}

}
