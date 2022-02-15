import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {User} from '../models/user';
import {Comment} from '../models/comment';
import {CommentService} from '../services/comment.service';
import {PostVote} from "../models/postVote";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit, AfterViewInit {

  post: Post;
  hasVotedUp: boolean;
  hasVotedDown: boolean;
  isOwnPost: boolean;
  loading: boolean;

  constructor(
    private postSvc: PostService,
    protected authSvc: AuthService,
    protected commentSvc: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private alertSvc: AlertService) {
  }

  ngOnInit() {
    this.getPost();
    this.getComments();
    this.getVote();
  }

  ngAfterViewInit() {
    this.getPost();
    this.getVote();
  }

  getPost() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPost(id).subscribe(post => {
      this.loading = false;
      this.post = post;
      this.isOwnPost = this.authSvc.loggedInUserValue.id === this.post.user.id;
    });
  }

  getVote() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getVote(id, this.authSvc.loggedInUserValue.id).subscribe(response => {
        console.log(response);
        if (response && response['upvote'] === true) {
          this.hasVotedUp = true;
          this.hasVotedDown = false;
        } else if (response && response['downVote'] === true) {
          this.hasVotedDown = true;
          this.hasVotedUp = false;
        } else if (response === null) {
          this.hasVotedUp = false;
          this.hasVotedDown = false;
        }
    })
  }

  getComments() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentSvc.getCommentsByPost(id).subscribe(response => {
      this.commentSvc.comments = response;
    });
  }

  latestComments(comments: Comment[]) {
    if (comments != null) {
      return comments.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }

  deletePost(id: number) {
    this.postSvc.deletePost(id).subscribe(response => {
      // if (response === null) {
      this.router.navigate(['/']);
      this.alertSvc.success('Post Deleted!');
    }, () => {
      console.log('error');
      this.alertSvc.error('Sorry. There was error deleting this post');
    });
  }

  postVote(postId: number, userId: number, type: number) {
    //TODO still an error when you arrive on a page that has already been voted on, it requires two clicks to remove the vote
    console.log("post voting");
    console.log("post:" + postId, "userid:" + userId, "type:"  + type);
    if (this.post.userVote === 0) {
      this.postSvc.postVote(postId, userId, type).subscribe(response => {
        this.post = response;
      });
    }
    if (this.post.userVote === type) {
      this.postSvc.removeVote(postId, userId).subscribe(response => {
        this.post = response;
      });
    } else {
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.postSvc.postVote(postId, userId, type).subscribe(response => {
          this.post = response;
          this.hasVotedUp = false;
          this.hasVotedDown = false;
        });
      });
    }
  }

}
