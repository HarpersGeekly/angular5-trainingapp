import {User} from './user';
import {Post} from './post';

export class Comment {
  id: number;
  body: string;
  user: User;
  post: Post;
  voteCount: number;
  date: Date;
  isParentComment: boolean;
}
