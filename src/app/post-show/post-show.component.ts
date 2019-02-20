import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {User} from '../models/user';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit, AfterViewInit {

  post: Post;
  isOwnPost: boolean;
  hasVotedUp = false;
  hasVotedDown = false;

  constructor(
    private postSvc: PostService,
    public userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertSvc: AlertService) { }

  ngOnInit() {
    this.getPost();
  }

  ngAfterViewInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPost(id).subscribe(post => {
      this.post = post;
      console.log(post);
      this.hasVotedUp = post.loggedInUserHasVotedUp;
      this.hasVotedDown = post.loggedInUserHasVotedDown;
      this.isOwnPost = this.userSvc.loggedInUser.id === this.post.user.id;
    });
  }

  deletePost(id: number) {
    this.postSvc.deletePost(id).subscribe(response => {
        console.log(response);
      // if (response === null) {
        this.router.navigate(['/']);
        this.alertSvc.success('Post Deleted!');
      }, () => {
        console.log('error');
        this.alertSvc.error('Sorry. There was error deleting this post');
      });
  }

  postVote(postId: number, userId: number, type: number) {
    console.log(postId, userId, type);
    this.postSvc.postVote(postId, userId, type).subscribe(post => {
      this.post = post;
      if (type === 1) {
        this.hasVotedUp = true;
      } else {
        this.hasVotedDown = true;
      }
    });
  }

  removeVote(postId: number, userId: number) {
    this.postSvc.removeVote(postId, userId).subscribe(post => {
      this.post = post;
      this.hasVotedUp = false;
      this.hasVotedDown = false;
    });
  }

}
