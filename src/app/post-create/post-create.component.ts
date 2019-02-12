import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {User} from '../models/user';
import {inspect} from 'util';
import {UserService} from '../services/user.service';

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
  post: any = {};
  loading = false;
  newPost = new Post();

  ngOnInit() {
  }
  constructor(
    private postSvc: PostService,
    private userSvc: UserService) { }

  createPost() {
    this.post.user = this.userSvc.loggedInUser;
      this.newPost = this.post;
    this.postSvc.createPost(this.newPost).toPromise().then(response => {
      console.log('success: ' + inspect(response));
    }).catch(response => {
      console.log('error: ' + inspect(response));
    });
  }

// <!--<app-simplemde-title [markdown]="title" (markdownChange)="onMarkdownChangeTitle($event)"></app-simplemde-title>-->


  onMarkdownChangeTitle(markdown: string) {
    this.title = markdown;
    console.log(`markdown: ${this.title}`);
  }

  onMarkdownChangeSubtitle(markdown: string) {
    this.subtitle = markdown;
    console.log(`markdown: ${this.subtitle}`);
  }

}
