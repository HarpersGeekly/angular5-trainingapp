import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  posts: Post[];

  constructor(
    private userSvc: UserService,
    private postSvc: PostService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    this.getPosts();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userSvc.getUser(id).subscribe(user => { this.user = user; console.log(user); });

  }

  getPosts() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPosts(id).subscribe(posts => this.posts = posts);
  }

  sortedPostsById(posts: Post[]) {
    if (posts != null) {
      return posts.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }

}
