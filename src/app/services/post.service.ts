import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Post} from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {

  private postsUrl = '/api/post';  // URL to rest api, look at file: proxy.conf.json

  constructor(private http: HttpClient) { }

  getPosts(id: number): Observable<Post[]> {
    let url: string = this.postsUrl;
    if (id != null) {
      url = url + '/postsByUserId/' + id;
    } else if (id == null) {
      url = url + '/posts';
    }
    return this.http.get<Post[]>(url);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.postsUrl + '/postById/' + id);
  }
}
