import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {Comment} from '../models/comment';
import {CommentService} from '../services/comment.service';
import {AuthService} from "../services/auth.service";

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
      if (this.authSvc.loggedInUserValue != null) {
        this.isOwnPost = this.authSvc.loggedInUserValue.id === this.post.user.id;
      }
    });
  }

  getVote() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (this.authSvc.loggedInUserValue != null) {
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
      this.alertSvc.error('Sorry. There was an error deleting this post');
    });
  }

  postVote(postId: number, userId: number, type: number) {
    console.log("post voting");
    console.log("post:" + postId, "userid:" + userId, "type:"  + type);
    if (!this.hasVotedUp && !this.hasVotedDown) {
      this.postSvc.postVote(postId, userId, type).subscribe(response => {
        this.post = response;
        this.getVote();
      }, () => {
        console.log('error');
        this.alertSvc.error('Failed to vote. Try again later.');
      });
    }
    if (this.hasVotedUp && type == 1) {
      console.log("I've voted up, and want to remove up");
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.post = post;
        this.getVote();
      }, () => {
        console.log('error');
        this.alertSvc.error('Failed to remove vote. Try again later.');
      });
    }
    if (this.hasVotedUp && type == -1) {
      console.log("I've voted up, and want to take away up to vote down");
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.postSvc.postVote(postId, userId, -1).subscribe(response => {
          this.post = response;
          this.getVote();
        }, () => {
          console.log('error');
          this.alertSvc.error('Failed to vote. Try again later.');
        });
      });
    }
    if (this.hasVotedDown && type == -1) {
      console.log("I've voted down, and want to remove down");
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.post = post;
        this.getVote();
      });
    }
    if (this.hasVotedDown && type == 1) {
      console.log("I've voted down, and want to take away down to vote up");
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.postSvc.postVote(postId, userId, 1).subscribe(response => {
          this.post = response;
          this.getVote();
        });
      });
    }

    //=====old code for voting:
    // Had issue where if you visited the site and had previously voted, it wouldn't take away the current vote on first click after init, had to click twice
    // if (this.post.userVote === 0) {
    //   this.postSvc.postVote(postId, userId, type).subscribe(response => {
    //     this.post = response;
    //   });
    // }
    // if (this.post.userVote === type) {
    //   this.postSvc.removeVote(postId, userId).subscribe(response => {
    //     this.post = response;
    //   });
    // } else {
    //   this.postSvc.removeVote(postId, userId).subscribe(post => {
    //     this.postSvc.postVote(postId, userId, type).subscribe(response => {
    //       this.post = response;
    //       this.hasVotedUp = false;
    //       this.hasVotedDown = false;
    //     });
    //   });
    // }
  }


}
