import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {AlertService} from '../services/alert.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CommentService} from '../services/comment.service';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  isOwnProfile: boolean;
  isCommentOnProfile: boolean;
  posts: Post[];
  userComments: any[];
  showEditUserForm = false;

  constructor(
    public userSvc: UserService,
    public authSvc: AuthService,
    private postSvc: PostService,
    private commentSvc: CommentService,
    private route: ActivatedRoute,
    private alertSvc: AlertService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUser();
    this.getPosts();
    this.getComments();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userSvc.getUser(id).subscribe(user => {
      this.userSvc.user = user; // any component that injects the UserService can use this user
      this.user = this.userSvc.user;
      if (this.authSvc.loggedInUser != null || undefined) {
        if (this.authSvc.loggedInUserValue.id === this.user.id) {
          this.authSvc.getLoggedInUserSubject.next(this.user);
          this.isOwnProfile = (this.authSvc.loggedInUserValue.id === this.user.id);
        }
      }
    });
  }

  getPosts() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPosts(id).subscribe(posts =>
      this.posts = posts);
  }

  getComments() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentSvc.getCommentsByUser(id).subscribe(cmts => {
      this.commentSvc.comments = cmts;
      this.userComments = this.commentSvc.comments;
      this.isCommentOnProfile = true;
      console.log(cmts);
    });
  }

  deletePost(id: number) {
    this.postSvc.deletePost(id).subscribe(response => {
      console.log(response);
      const userId = +this.route.snapshot.paramMap.get('id');
      this.postSvc.getPosts(userId).subscribe(posts => {
        this.posts = posts;
        this.snackBar.open('Post Deleted!', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        // this.alertSvc.success('Post Deleted!');
      });
    }, () => {
      console.log('error');
      this.snackBar.open('Sorry. There was error deleting this post', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      // this.alertSvc.error('');
    });
  }

  // openSnackBar(message: string, action: string, className: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 2000,
  //     extraClasses: [className]
  //   });
  // }

  sortedPostsById(posts: Post[]) {
    if (posts != null) {
      return posts.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }

  toggleEditUserForm() {
    this.showEditUserForm = !this.showEditUserForm;
  }

}
