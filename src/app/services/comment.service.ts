import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../models/comment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommentService {
  private commentUrl = '/api/comment';
  comments: Comment[];

  constructor(private http: HttpClient) {
  }

  getCommentsByUser(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl + '/commentsByUser/' + userId);
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl + '/commentsByPost/' + postId);
  }

  create(comment: Comment) {
    return this.http.post<Comment>(this.commentUrl + '/saveComment', comment);
  }

  delete(id: number) {
    return this.http.delete(this.commentUrl + '/deleteComment/' + id);
  }
}
