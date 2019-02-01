import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

const httpOptions =  {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:8888/api/user';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/id/' + id);
  }

}
