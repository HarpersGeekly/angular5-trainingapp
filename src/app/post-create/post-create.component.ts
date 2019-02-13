import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {inspect} from 'util';
import {UserService} from '../services/user.service';

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
    private userSvc: UserService) { }

  createPost() {
    if (this.title === null) {
      this.titleIsEmpty = false;
    }
    this.loading = true;
    console.log('post from form: ' + this.post.title);
    console.log('post from form: ' + this.post.subtitle);
    console.log('post from form: ' + this.post.body);
    console.log('post from form: ' + this.post.leadImage);
    console.log('post: ' +  this.post.htmlTitle);
    this.post.user = this.userSvc.loggedInUser;
    this.postSvc.createPost(this.post).toPromise().then(response => {
      console.log('success: ' + inspect(response));
      this.loading = false;
    }).catch(response => {
      console.log('error: ' + inspect(response));
      this.loading = false;
    });
  }
}
