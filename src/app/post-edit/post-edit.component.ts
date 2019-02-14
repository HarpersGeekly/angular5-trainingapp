import { Component, OnInit } from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {inspect} from 'util';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  loading = false;
  constructor(private postSvc: PostService, private router: Router, private route: ActivatedRoute, private alertSvc: AlertService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPost(id).subscribe(post => {
      this.post = post;
    });
  }

  editPost() {
    this.loading = true;
    this.postSvc.editPost(this.post).toPromise().then(post => {
      console.log('success: ' + inspect(post));
      this.loading = false;
      this.router.navigate(['/post/' + post.id + '/' + post.title, {success: true}]);
      this.alertSvc.success('Post updated!', true);
    }).catch(post => {
      console.log('error: ' + inspect(post));
      this.loading = false;
      this.alertSvc.error('Sorry. There was an error while editing this post.', true);
    });
  }
}
