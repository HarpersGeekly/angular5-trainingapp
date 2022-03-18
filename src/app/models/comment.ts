import {User} from './user';
import {Post} from './post';

export class Comment {
  id: number;
  body: string;
  user: User;
  post: Post;
  voteCount: number;
  date: Date;
  hoursMinutes: string;
  formatDate: string;
  isParentComment: boolean;
  hasBeenDeleted: boolean;
  userVote: number;
  parentId: number;
  createdAt: string;
}
