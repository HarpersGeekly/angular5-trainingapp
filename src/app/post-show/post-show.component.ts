import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {User} from '../models/user';
import {Comment} from '../models/comment';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit, AfterViewInit {

  post: Post;
  isOwnPost: boolean;
  comments: Comment[];

  constructor(
    private postSvc: PostService,
    public userSvc: UserService,
    private commentSvc: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private alertSvc: AlertService) {
  }

  ngOnInit() {
    this.getPost();
    this.getComments();
  }

  ngAfterViewInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPost(id).subscribe(post => {
      this.post = post;
      this.isOwnPost = this.userSvc.loggedInUser.id === this.post.user.id;
    });
  }

  getComments() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentSvc.getCommentsByPost(id).subscribe(response => {
      this.comments = response;
    });
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
    if (this.post.userVote === 0) {
      this.postSvc.postVote(postId, userId, type).subscribe(response => {
        this.post = response;
      });
    } else if (this.post.userVote === type) {
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.post = post;
      });
    } else {
      this.postSvc.removeVote(postId, userId).subscribe(post => {
        this.postSvc.postVote(postId, userId, type).subscribe(response => {
          this.post = response;
        });
      });
    }
  }


}
