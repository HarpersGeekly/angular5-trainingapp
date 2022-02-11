import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {UserService} from '../services/user.service';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.css']
})
export class PostsIndexComponent implements OnInit, AfterViewInit {
  posts: Post[];

  constructor(private postSvc: PostService, protected authSvc: AuthService) {
  }

  ngOnInit() {
    // check for user in localStorage
    if (localStorage.getItem('currentUser')) {
      this.authSvc.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("logged in user: " + this.authSvc.loggedInUserValue.token);
      console.log("logged in user: " + this.authSvc.loggedInUserValue.username);
    }
    this.getPosts();
  }

  ngAfterViewInit() {
    this.getPosts();
  }

  getPosts() {
    this.postSvc.getPosts(null)
      .subscribe(posts => {
        this.posts = posts;
        console.log(posts); // .subscribe() is like .then(), response is posts that I assign to the variable posts
      });
  }

  sortedPostsById(posts: Post[]) {
    if (posts != null) {
      return posts.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }
}
