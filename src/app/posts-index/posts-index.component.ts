import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.css']
})
export class PostsIndexComponent implements OnInit {
  posts: Post[];
  constructor(private postSvc: PostService, private userSvc: UserService) {
  }

  ngOnInit() {
    // check for user in localStorage
    if (localStorage.getItem('currentUser')) {
      this.userSvc.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    }
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
