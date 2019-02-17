import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AlertService} from '../services/alert.service';
import {User} from '../models/user';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit, AfterViewInit {

  post: Post;
  isOwnPost: boolean;

  constructor(
    private postSvc: PostService,
    public userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertSvc: AlertService) { }

  ngOnInit() {
    this.getPost();
  }

  ngAfterViewInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postSvc.getPost(id).subscribe(post => {
      this.post = post;
      this.isOwnPost = this.userSvc.loggedInUser.id === this.post.user.id;
    });
  }

  deletePost(id: number) {
    this.postSvc.deletePost(id).subscribe(response => {
        console.log(response);
      // if (response === null) {
        this.router.navigate(['/']);
        this.alertSvc.success('Post Deleted!');
      }, () => {
        console.log('error');
        this.alertSvc.error('Sorry. There was error deleting this post');
      });
  }

}
