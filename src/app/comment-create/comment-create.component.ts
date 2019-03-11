import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../services/comment.service';
import {Post} from '../models/post';
import {User} from '../models/user';
import {Comment} from '../models/comment';
import {MatSnackBar} from '@angular/material';
import {inspect} from 'util';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  showCommentCancelSubmit = false;
  comment = new Comment();
  @Input() user: User;
  @Input() post: Post;
  loading = false;
  commentForm = new FormGroup({
    body: new FormControl('', [Validators.maxLength(1500)]),
  });

  constructor(private commentSvc: CommentService, private snackBar: MatSnackBar) {
  }

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
      this.loading = true;
      this.comment.body = this.commentForm.value.body;
      this.comment.post = this.post;
      this.comment.user = this.user;
      this.commentSvc.create(this.comment).toPromise().then(response => {
        this.commentForm.reset({body: ''});
        this.showCommentCancelSubmit = false;
        this.loading = false;
      }).catch(resp => {
        console.log('error: ' + inspect(resp));
        this.loading = false;
        this.snackBar.open('Sorry, there was an error when creating this comment', '', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      });
    }

  }
}
