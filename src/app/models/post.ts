import {User} from './user';

export class Post {
  id: number;
  title: string;
  subtitle: string;
  leadImage: string;
  body: string;
  date: Date;
  user: User;
}
