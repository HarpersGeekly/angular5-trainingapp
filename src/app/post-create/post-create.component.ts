import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {inspect} from 'util';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title: string;
  titleIsEmpty: boolean;
  subtitle: string;
  leadImage: string;
  body: string;
  post = new Post();
  loading = false;

  ngOnInit() {
  }
  constructor(
    private postSvc: PostService,
    private userSvc: UserService,
    private router: Router,
    private alertSvc: AlertService) { }

  createPost() {
    if (this.title === null) {
      this.titleIsEmpty = false;
    }
    this.loading = true;
    this.post.user = this.userSvc.loggedInUser;
    this.postSvc.createPost(this.post).toPromise().then(response => {
      console.log('success: ' + inspect(response));
      this.loading = false;
      this.router.navigate(['/post/' + this.post.id + '/'
      + this.post.title, {success: true}]);
      this.alertSvc.success('Post created!', true);
    }).catch(response => {
      console.log('error: ' + inspect(response));
      this.loading = false;
      this.alertSvc.error('Sorry. There was an error creating a post.', true);
    });
  }
}
