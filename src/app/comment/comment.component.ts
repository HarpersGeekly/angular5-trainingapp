import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../models/comment';
import {UserService} from '../services/user.service';
import {CommentService} from '../services/comment.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() isCommentOnProfile: boolean;
  isOwnComment: boolean;
  showEditCommentForm = false;

  constructor(public commentSvc: CommentService, public authSvc: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.authSvc.loggedInUserValue != null) {
      this.isOwnComment = this.authSvc.loggedInUserValue.id === this.comment.user.id;
    }
  }

  // getCommentsByParent(id: number) {
  //   this.commentSvc.getCommentsByParent(id).subscribe(comments => {
  //     console.log("comments: " + comments);
  //   })
  // }

  deleteComment(id: number) {
    this.commentSvc.delete(id).subscribe(response => {
      // this.comment = response;
      this.comment.hasBeenDeleted = true;
      this.snackBar.open('Comment Deleted!', '', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    });
  }

  toggleEditCommentForm() {
    this.showEditCommentForm = !this.showEditCommentForm;
  }

  cancelComment() {
    this.showEditCommentForm = false;
    // this.commentForm.reset({body: ''});
  }

}
