import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../models/comment';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  constructor(public userSvc: UserService) { }

  ngOnInit() {
  }

}
