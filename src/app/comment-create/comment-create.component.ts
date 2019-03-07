import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  showCommentCancelSubmit = false;
  loggedInUser = this.userSvc.loggedInUser;
  commentForm = new FormGroup({
    body: new FormControl('', [Validators.maxLength(1500)]),
  });

  constructor(private commentSvc: CommentService, private userSvc: UserService) { }

  ngOnInit() {

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.commentForm.controls[controlName].hasError(errorName);
  }

  toggleCommentCancelSubmit() {
    this.showCommentCancelSubmit = !this.showCommentCancelSubmit;
    this.showCommentCancelSubmit = true;
  }

  cancelComment() {
    this.showCommentCancelSubmit = false;
    this.commentForm.reset({body: ''});
  }

  onSubmit() {
    if (this.commentForm.valid) {
      // console.log(userId);
      // const userId = this.userSvc.loggedInUser.id;
      console.log(this.commentForm.value);
      this.commentForm.reset({body: ''});
      this.showCommentCancelSubmit = false;

    }
  }

}
