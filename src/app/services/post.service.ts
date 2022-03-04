import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Post} from '../models/post';
import {PostVote} from '../models/postVote';
import {UserService} from './user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PostService {
  private postsUrl = '/api/post';  // URL to rest api, look at file: proxy.conf.json
  successfulDelete: boolean;
  vote: PostVote;
  userId: number;

  constructor(private http: HttpClient, private userSvc: UserService) {
  }

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
    // if (this.userSvc.loggedInUser != null) {
    //   this.userId = this.userSvc.loggedInUser.id;
    //   return this.http.get<Post>(this.postsUrl + '/postById/' + id + '?userId=' + this.userId.toString());
    // } else {
      return this.http.get<Post>(this.postsUrl + '/postById/' + id);
    // }
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
  }

  postVote(postId: number, userId: number, type: number): Observable<Post> {
    return this.http.post<Post>(this.postsUrl + '/postVote/' + postId + '/' + userId + '/' + type, this.vote);
  }

  getVote(postId: number, userId: number) {
    return this.http.get<PostVote>(this.postsUrl + '/postVote/' + postId + '/' + userId)
  }

  removeVote(postId: number, userId: number): Observable<Post> {
    return this.http.post<Post>(this.postsUrl + '/removeVote/' + postId + '/' + userId, this.vote);
  }
}


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
