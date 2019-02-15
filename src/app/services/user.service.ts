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
  successfulEdit = true;

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

  update(user: User) {
    return this.http.put(this.usersUrl + '/editUser',
      JSON.stringify(user), {headers: httpOptions.headers, observe: 'response'}).subscribe(response => {
        console.log(response);
      if (response.status === 200) {
        this.successfulEdit = true;
      }
      this.successfulEdit = true; // TODO figure out a way to wait for this function to end in the component. This is "always" true...
      return this.successfulEdit;
    });
  }

  delete(id: number) {
    return this.http.delete(this.usersUrl + '/deleteUser/' + id);
    // {headers: httpOptions.headers, observe: 'response'})
    //   .subscribe(response => {
    //   if (response.status === 200) {
    //     try {
    //       this.getUser(id).subscribe();
    //     } catch {
    //       this.successfulDelete = false;
    //     }
    //   } else {
    //       this.successfulDelete = false;
    //   }
    //     return this.successfulDelete;
    // });
  }

}
