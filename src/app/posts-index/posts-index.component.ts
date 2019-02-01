import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.css']
})
export class PostsIndexComponent implements OnInit {
  posts: Post[];
  constructor(private postSvc: PostService) {
  }

  ngOnInit() {
    // check for userId
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
    return posts.sort(function(a, b) { return b.id - a.id; });
  }
}
