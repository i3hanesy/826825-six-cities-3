import {User} from './offer';

export type Review = {
  review: string;
  rating: string;
}

export type Comment = {
  id: string;
  date: string | number | Date;
  user: User;
  comment: string;
  rating: number;
}


export type Comments = Comment[];
