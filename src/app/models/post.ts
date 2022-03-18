import {User} from './user';

export class Post {
  id: number;
  title: string;
  subtitle: string;
  leadImage: string;
  body: string;
  date: Date;
  user: User;
  hoursMinutes: string;
  formatDate: string;
  htmlTitle: string;
  htmlBody: string;
  htmlSubtitle: string;
  htmlLeadImage: string;
  voteCount: number;
  userVote: number;
  commentCount: number;
  viewCount: number;
}
