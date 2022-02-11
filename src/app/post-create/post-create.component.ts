import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {inspect} from 'util';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title: string;
  subtitle: string;
  leadImage: string;
  body: string;
  post = new Post();
  loading = false;

  ngOnInit() {
  }

  constructor(
    private postSvc: PostService,
    private authSvc: AuthService,
    private router: Router,
    private alertSvc: AlertService) {
  }

  createPost() {
    this.loading = true;
    this.post.user = this.authSvc.loggedInUserValue;
    this.post.commentCount = 0;
    console.log(this.authSvc.loggedInUser);
    this.postSvc.createPost(this.post).toPromise().then(post => {
      console.log('success: ' + inspect(post));
      this.loading = false;
      this.router.navigate(['/post/' + post.id + '/' + post.title]);
      this.alertSvc.success('Post created!', true);
    }).catch(post => {
      console.log('error: ' + inspect(post));
      this.loading = false;
      this.alertSvc.error('Sorry. There was an error creating a post.', true);
    });
  }
}
