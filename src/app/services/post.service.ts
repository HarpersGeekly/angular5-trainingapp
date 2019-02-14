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
  successfulDelete: boolean;

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

  createPost(post: Post) {
    return this.http.post<Post>(this.postsUrl + '/savePost', post);
  }

  editPost(post: Post) {
    return this.http.put<Post>(this.postsUrl + '/editPost', post);
  }

  deletePost(id: number) {
    this.successfulDelete = true;
    return this.http.delete(this.postsUrl + '/deletePost/' + id);
    //   {headers: httpOptions.headers, observe: 'response'}).subscribe(response => {
    //     console.log(response.status);
    //     if (response.status === 200) {
    //       console.log('back from deleting in REST API');
    //       this.successfulDelete = true;
    //     } else {
    //       console.log('else false');
    //       this.successfulDelete = false;
    //     }
    //     console.log(this.successfulDelete);
    //     return this.successfulDelete;
    //   },
    //   // error goes here );
    // );
  }
}
