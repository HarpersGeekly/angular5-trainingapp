import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {

  post: Post;
  isOwnPost: boolean;

  constructor(
    private postSvc: PostService,
    private userSvc: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPost(id).subscribe(post => {
      this.post = post;
      this.isOwnPost = this.userSvc.loggedInUser.id === this.post.user.id;
    });
  }

}
